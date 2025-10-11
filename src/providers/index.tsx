/**
 * Root Provider Component
 * Wraps the app with Redux Store, React Query, and Notification providers
 * Order matters: Store -> Query -> Notification -> Children
 */

import React from "react";
import { StoreProvider } from "@/providers/redux-provider";
import { QueryProvider } from "@/providers/query-provider";
import { NotificationProvider } from "@/providers/notification-provider";

export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider>
      <QueryProvider>
        <NotificationProvider position="top-right">
          {children}
        </NotificationProvider>
      </QueryProvider>
    </StoreProvider>
  );
}
