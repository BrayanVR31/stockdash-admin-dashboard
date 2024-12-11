import { Request, Response, NextFunction, RequestHandler } from "express";
import { ServerError, ResponseError } from "@types";
import { HTTP_ERROR_CODES } from "@enums";

// Handle each server error such as database, validation, internal error, etc.
export function handleError(
  error: ServerError,
  request: Request,
  response: Response<ResponseError>,
  next: NextFunction,
) {
  const { status: code, message, name: title, jsonKey = "error" } = error;
  return response.status(code).json({
    [jsonKey]: {
      code,
      message,
      title,
      type: HTTP_ERROR_CODES[code],
    },
  }) as unknown as void;
}
