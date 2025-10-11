import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as authAPI from "./api-services";

export const useRegisterEmail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: REQUEST.TRegisterEmail) => authAPI.registerEmail(data),
    onSuccess: (response) => {
      if (response.isSuccess && response.data) {
        localStorage.setItem("access_token", response.data.authToken.token);
        queryClient.setQueryData(["auth-user"], response.data.authUser);
        navigate("/home");
      }
    },
    onError: () => {},
  });
};

export const useLoginEmail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: REQUEST.TLoginEmail) => authAPI.loginEmail(data),
    onSuccess: (response) => {
      if (response.isSuccess && response.data) {
        localStorage.setItem("access_token", response.data.authToken.token);
        queryClient.setQueryData(["auth-user"], response.data.authUser);
        navigate("/home");
      }
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      queryClient.clear();
      navigate("/");
    },
    onError: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      queryClient.clear();
      navigate("/");
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authAPI.refreshToken(refreshToken),
    onSuccess: (response) => {
      if (response.isSuccess && response.data) {
        localStorage.setItem("access_token", response.data.token);
      }
    },
    onError: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/";
    },
  });
};
