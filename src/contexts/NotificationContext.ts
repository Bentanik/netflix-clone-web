import { createContext } from "react";
import type useNotification from "@/hooks/useNotification";

export type NotificationContextType = ReturnType<typeof useNotification>;

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
