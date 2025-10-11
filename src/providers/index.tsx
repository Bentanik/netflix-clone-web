/**
 * Root Provider Component
 * Wraps the app with Redux Store and React Query providers
 * Order matters: Store -> Query -> Children
 */

import React from "react";
import { StoreProvider } from "@/providers/redux-provider";
import { QueryProvider } from "@/providers/query-provider";

export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </StoreProvider>
  );
}
