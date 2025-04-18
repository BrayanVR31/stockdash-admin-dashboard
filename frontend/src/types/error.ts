export type TypeError = "login-again" | "none";

export interface ErrorInfo {
  message: string;
  type: TypeError;
  ilustration: string;
  statusCode: number;
}
