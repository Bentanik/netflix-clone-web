import axios, { AxiosError } from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { v4 as uuidv4 } from "uuid";
import { tokenStorage } from "@/lib/auth_utils";
import AUTH_API_PATH from "@/services/auth/api-path";
import { store } from "@/stores/redux";
import { clearUser } from "@/stores/redux/user-slice";
import { notificationService } from "@/services/notification-service";

// ==================== CONSTANTS ====================
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const TIMEOUT = 30000;
const MUTATION_METHODS = ["POST", "PUT", "PATCH", "DELETE"];
// ==================== UTILITIES ====================
const shouldAddIdempotenceKey = (method?: string): boolean =>
  method ? MUTATION_METHODS.includes(method.toUpperCase()) : false;

// ==================== AXIOS INSTANCE ====================
const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== REFRESH TOKEN ====================
const refreshTokenAsync = async (refreshToken: string) => {
  const response = await request<TResponse<API.TLoginResponse>>(
    AUTH_API_PATH.REFRESH_TOKEN,
    {
      method: "PUT",
      data: refreshToken,
    }
  );
  return response.data;
};

// ==================== REQUEST INTERCEPTOR ====================
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) return config;

    // Add Authorization token
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add idempotence key for mutation requests
    if (
      !config.headers["x-request-id"] &&
      shouldAddIdempotenceKey(config.method)
    ) {
      config.headers["x-request-id"] = uuidv4();
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ==================== RESPONSE INTERCEPTOR ====================
request.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized with token refresh
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        notificationService.error(
          "Phiên đăng nhập hết hạn",
          "Vui lòng đăng nhập lại."
        );

        tokenStorage.clearTokens();
        store.dispatch(clearUser());

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);

        return Promise.reject(error);
      }

      try {
        const response = await refreshTokenAsync(refreshToken);
        const newAccessToken = response.data?.accessToken;
        const newRefreshToken = response.data?.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          throw new Error("Invalid token response");
        }

        tokenStorage.setTokens(newAccessToken.token, newRefreshToken.token);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;
        }

        return request(originalRequest);
      } catch (refreshError) {
        notificationService.error(
          "Phiên đăng nhập hết hạn",
          "Không thể làm mới phiên đăng nhập. Vui lòng đăng nhập lại."
        );

        tokenStorage.clearTokens();
        store.dispatch(clearUser());

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);

        return Promise.reject(refreshError);
      }
    }

    // Map client errors (<500) to TErrors format
    if (error.response && error.response.status < 500) {
      const responseError: TErrors = error.response.data as TErrors;
      return Promise.reject(responseError);
    }

    // Server errors (>=500) reject as is
    return Promise.reject(error);
  }
);

export default request;
