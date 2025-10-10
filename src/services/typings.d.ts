declare type TResponse<T = object | null> = {
  code: string;
  message: string;
  data: T | null;
  isSuccess: boolean;
  isFailure: boolean;
};

declare type TError = {
  code: string;
  message: string;
  data?: object | null;
};

declare type TErrors = {
  isSuccess: boolean;
  isFailure: boolean;
  errors: TError[];
};
