/**
 * Navigation Service
 * Cho phép navigate từ non-React code (như interceptors)
 * Sử dụng custom events để communicate với React Router
 */

const NAVIGATE_EVENT = "app:navigate";

export interface NavigatePayload {
  path: string;
  replace?: boolean;
}

/**
 * Dispatch navigate event
 */
const dispatchNavigate = (payload: NavigatePayload) => {
  const event = new CustomEvent(NAVIGATE_EVENT, { detail: payload });
  window.dispatchEvent(event);
};

/**
 * Subscribe to navigate events
 */
export const subscribeToNavigate = (
  callback: (payload: NavigatePayload) => void
) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<NavigatePayload>;
    callback(customEvent.detail);
  };

  window.addEventListener(NAVIGATE_EVENT, handler);

  return () => {
    window.removeEventListener(NAVIGATE_EVENT, handler);
  };
};

/**
 * Navigation Service API
 * Có thể gọi từ bất kỳ đâu, kể cả non-React code
 */
export const navigationService = {
  navigate: (path: string, replace = false) => {
    dispatchNavigate({ path, replace });
  },

  goToHome: () => {
    dispatchNavigate({ path: "/", replace: true });
  },

  goToLogin: () => {
    dispatchNavigate({ path: "/", replace: true });
  },
};
