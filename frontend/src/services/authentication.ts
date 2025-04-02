import { stockdashInstance } from "./stockdashService";

interface User {
  email: string;
  password: string;
}

interface ValidationError {
  code: string;
  message: string;
  path: string;
}

export interface AuthError {
  status: number;
  message: string;
  errors: ValidationError[];
}

interface AuthSuccess {
  message: string;
  status: number;
  token: string;
}

export const login = async (user: User) => {
  return (await stockdashInstance.post<AuthSuccess>("/sign-in", user)).data;
};

export const logout = async () => {
  return (
    await stockdashInstance.get<Pick<AuthError, "status" | "message">>(
      "/log-out",
    )
  ).data;
};
