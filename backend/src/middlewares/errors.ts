import { Request, Response, NextFunction, RequestHandler } from "express";
import { ServerError, ResponseError } from "@types";
import { HTTP_STATUS_CODES } from "@enums";

// Handle each server error such as database, validation, internal error, etc.
export function handleError(
  error: ServerError,
  request: Request,
  response: Response<ResponseError>,
  next: NextFunction,
) {
  const { status: code, message, title, jsonKey = "error" } = error;
  return response.status(code).json({
    [jsonKey]: {
      title,
      message,
      code,
      type: HTTP_STATUS_CODES[code],
    },
  }) as unknown as void;
}
