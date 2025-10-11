/**
 * Notification Service
 * Cho phép show notifications từ bất kỳ đâu (non-React contexts)
 * Sử dụng custom events để communicate với NotificationProvider
 */

export type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationPayload {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

const NOTIFICATION_EVENT = "app:notification";

/**
 * Dispatch notification event
 */
const dispatchNotification = (payload: NotificationPayload) => {
  const event = new CustomEvent(NOTIFICATION_EVENT, { detail: payload });
  window.dispatchEvent(event);
};

/**
 * Subscribe to notification events
 */
export const subscribeToNotifications = (
  callback: (payload: NotificationPayload) => void
) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<NotificationPayload>;
    callback(customEvent.detail);
  };

  window.addEventListener(NOTIFICATION_EVENT, handler);

  return () => {
    window.removeEventListener(NOTIFICATION_EVENT, handler);
  };
};

/**
 * Notification Service API
 * Có thể gọi từ bất kỳ đâu, kể cả non-React code
 */
export const notificationService = {
  success: (title: string, message?: string, duration?: number) => {
    dispatchNotification({ type: "success", title, message, duration });
  },

  error: (title: string, message?: string, duration?: number) => {
    dispatchNotification({ type: "error", title, message, duration });
  },

  warning: (title: string, message?: string, duration?: number) => {
    dispatchNotification({ type: "warning", title, message, duration });
  },

  info: (title: string, message?: string, duration?: number) => {
    dispatchNotification({ type: "info", title, message, duration });
  },
};
