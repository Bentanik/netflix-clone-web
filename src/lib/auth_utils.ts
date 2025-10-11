const TOKEN_KEYS = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
} as const;

export const tokenStorage = {
  getAccessToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEYS.ACCESS);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEYS.REFRESH);
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH, refreshToken);
  },

  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_KEYS.ACCESS);
    localStorage.removeItem(TOKEN_KEYS.REFRESH);
  },

  hasTokens: (): boolean => {
    return Boolean(
      tokenStorage.getAccessToken() && tokenStorage.getRefreshToken()
    );
  },
};
