import { useState, useCallback } from "react";
import type { NotificationProps } from "@/components/ui/Notification";

type NotificationOptions = Omit<NotificationProps, "id" | "onClose">;

export default function useNotification() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = useCallback((options: NotificationOptions) => {
    const id = `notification-${Date.now()}-${Math.random()}`;

    setNotifications((prev) => [
      ...prev,
      {
        ...options,
        id,
        onClose: (removeId: string) => {
          setNotifications((current) =>
            current.filter((notification) => notification.id !== removeId)
          );
        },
      },
    ]);

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Helper functions for specific types
  const success = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addNotification({ type: "success", title, message, duration });
    },
    [addNotification]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addNotification({ type: "error", title, message, duration });
    },
    [addNotification]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addNotification({ type: "warning", title, message, duration });
    },
    [addNotification]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) => {
      return addNotification({ type: "info", title, message, duration });
    },
    [addNotification]
  );

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  };
}
