import { Response, Request, NextFunction } from "express";

// Types
interface Params {
  id: string;
  [key: string]: any;
}

export type Controller<JSONRes = any> = (
  request: Request<Params>,
  response: Response<JSONRes>,
  next: NextFunction,
) => Promise<Response | void>;
