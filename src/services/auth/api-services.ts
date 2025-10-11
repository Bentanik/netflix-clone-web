import request from "@/services/interceptors";
import API_PATH from "@/services/auth/api-path";

export const registerEmailAsync = async (body: REQUEST.TRegisterEmail) => {
  const response = await request<TResponse>(API_PATH.REGISTER_EMAIL, {
    method: "POST",
    data: body,
  });
  return response.data;
};

export const loginEmailAsync = async (body: REQUEST.TLoginEmail) => {
  const response = await request<TResponse<API.TLoginResponse>>(
    API_PATH.LOGIN_EMAIL,
    {
      method: "POST",
      data: body,
    }
  );
  return response.data;
};

export const logoutAsync = async () => {
  const response = await request<TResponse>(API_PATH.LOGOUT, {
    method: "DELETE",
  });
  return response.data;
};

export const refreshTokenAsync = async (refreshToken: string) => {
  const response = await request<TResponse<API.TLoginResponse>>(
    API_PATH.REFRESH_TOKEN,
    {
      method: "PUT",
      data: { refreshToken },
    }
  );
  return response.data;
};

export const refreshTokenCheckAsync = async () => {
  const response = await request<string>(API_PATH.AUTH, {
    method: "GET",
  });
  return response.data;
};
