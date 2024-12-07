import { Response, Request, NextFunction } from "express";

export type Controller = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<Response | void>;
