import axiosInstance from "../interceptors";
import API_PATH from "./api-path";

export const registerEmail = async (
  data: REQUEST.TRegisterEmail
): Promise<TResponse<API.TLoginResponse>> => {
  const response = await axiosInstance.post<TResponse<API.TLoginResponse>>(
    API_PATH.REGISTER_EMAIL,
    data
  );
  return response.data;
};

export const loginEmail = async (
  data: REQUEST.TLoginEmail
): Promise<TResponse<API.TLoginResponse>> => {
  const response = await axiosInstance.post<TResponse<API.TLoginResponse>>(
    API_PATH.LOGIN_EMAIL,
    data
  );
  return response.data;
};

export const logout = async (): Promise<TResponse<null>> => {
  const response = await axiosInstance.post<TResponse<null>>(API_PATH.LOGOUT);
  return response.data;
};

export const refreshToken = async (
  refreshToken: string
): Promise<TResponse<API.TAuthToken>> => {
  const response = await axiosInstance.post<TResponse<API.TAuthToken>>(
    API_PATH.REFRESH_TOKEN,
    { refreshToken }
  );
  return response.data;
};
