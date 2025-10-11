declare namespace REQUEST {
  type TRegisterEmail = {
    email: string;
    password: string;
    displayName: string;
  };

  type TLoginEmail = {
    email: string;
    password: string;
  };
}

declare namespace API {
  type TAuthToken = {
    token: string;
    tokenType: string;
  };

  type TAuthUser = {
    displayName: string;
    email: string;
    avatarUrl?: string;
  };

  type TLoginResponse = {
    authUser: TAuthUser;
    accessToken: TAuthToken;
    refreshToken: TAuthToken;
  };
}
