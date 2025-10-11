import axios, { AxiosError } from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

/**
 * Axios Instance với interceptors
 * Base URL và timeout configuration
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * Tự động thêm token vào header
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Xử lý refresh token và error handling
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          // Không có refresh token, redirect đến login
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Gọi API refresh token
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:8080"
          }/auth/api/v1/refresh-token`,
          { refreshToken }
        );

        const { token } = response.data.data.authToken;

        // Lưu token mới
        localStorage.setItem("access_token", token);

        // Retry request với token mới
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Xử lý các lỗi khác
    if (error.response?.status === 403) {
      console.error(
        "Forbidden: You do not have permission to access this resource"
      );
    }

    if (error.response?.status === 404) {
      console.error("Not Found: The requested resource was not found");
    }

    if (error.response?.status === 500) {
      console.error("Server Error: Something went wrong on the server");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
