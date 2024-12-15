import { Response, Request, NextFunction } from "express";

// Types
interface Params {
  id: string;
  [key: string]: any;
}

interface QueryParams {
  page: string;
  sort: {
    by: string;
    order: "ASC" | "DESC";
  };
  per_page: string;
  [key: string]: any;
}

export type Controller<JSONRes = any> = (
  request: Request<Params,any,any,QueryParams >,
  response: Response<JSONRes>,
  next: NextFunction,
) => Promise<Response | void>;
