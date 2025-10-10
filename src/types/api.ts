// API Response Types
export namespace API {
  // Auth User DTO
  export interface TAuthUserDto {
    id: string;
    email: string;
    displayName: string;
    avatar?: string;
    role?: "user" | "admin";
    createdAt?: string;
    updatedAt?: string;
  }

  // Login Request/Response
  export interface TLoginRequest {
    email: string;
    password: string;
  }

  export interface TLoginResponse {
    user: TAuthUserDto;
    accessToken: string;
    refreshToken: string;
  }

  // Register Request/Response
  export interface TRegisterRequest {
    email: string;
    password: string;
    displayName: string;
  }

  export interface TRegisterResponse {
    user: TAuthUserDto;
    accessToken: string;
    refreshToken: string;
  }

  // Refresh Token Request/Response
  export interface TRefreshTokenRequest {
    refreshToken: string;
  }

  export interface TRefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
  }

  // Generic API Response
  export interface TApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
  }

  // API Error Response
  export interface TApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
    statusCode?: number;
  }
}
