import { useMutation } from "@tanstack/react-query";
import { tokenStorage } from "@/lib/auth_utils";
import {
  loginEmailAsync,
  logoutAsync,
  registerEmailAsync,
} from "@/services/auth/api-services";
import { useAppDispatch } from "@/stores";
import { clearUser, setUser } from "@/stores/redux/user-slice";

export const useRegisterEmail = () => {
  return useMutation<TResponse, TErrors, REQUEST.TRegisterEmail>({
    mutationFn: registerEmailAsync,
  });
};

export const useLoginEmail = () => {
  const dispatch = useAppDispatch();
  return useMutation<
    TResponse<API.TLoginResponse>,
    TErrors,
    REQUEST.TLoginEmail
  >({
    mutationFn: loginEmailAsync,
    onSuccess: (res) => {
      if (res.isSuccess && res.data) {
        const { accessToken, refreshToken } = res.data;
        tokenStorage.setTokens(accessToken.token, refreshToken.token);
        dispatch(
          setUser({
            displayName: res.data.authUser.displayName,
            email: res.data.authUser.email,
            avatarUrl: res.data.authUser.avatarUrl,
          })
        );
      }
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const handleCleanup = () => {
    tokenStorage.clearTokens();
    dispatch(clearUser());
    window.location.href = "/";
  };

  return useMutation<TResponse, TError>({
    mutationFn: logoutAsync,
    onSuccess: handleCleanup,
    onError: handleCleanup,
  });
};
