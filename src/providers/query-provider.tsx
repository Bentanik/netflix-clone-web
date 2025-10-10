import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
    MutationCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const createQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                gcTime: 10 * 60 * 1000,
                retry: 3,
                retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
                refetchOnWindowFocus: import.meta.env.PROD,
                refetchOnReconnect: true,
                refetchOnMount: true,
            },
            mutations: {
                retry: 1,
                retryDelay: 1000,
            },
        },
        queryCache: new QueryCache({
            onError: (error, query) => {
                console.error('Query Error:', {
                    queryKey: query.queryKey,
                    error,
                });
            },
        }),
        mutationCache: new MutationCache({
            onError: (error, _variables, _context, mutation) => {
                console.error('Mutation Error:', {
                    mutationKey: mutation.options.mutationKey,
                    error,
                });
            },
        }),
    });
};

/**
 * React Query Provider Component
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => createQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}

            {import.meta.env.DEV && (
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom"
                    buttonPosition="bottom-right"
                />
            )}
        </QueryClientProvider>
    );
}