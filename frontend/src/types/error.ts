export type ResponseError = "FORBIDDEN" | "EXPIRED_SESSION";

export type ErrorDescription = {
  title: string;
  description: string;
  image: string;
  statusCode: number;
};

export type ApiError = {
  error: {
    title: string;
    message: string;
    code: number;
    type: ResponseError;
  };
};
