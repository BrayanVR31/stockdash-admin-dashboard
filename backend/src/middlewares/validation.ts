import { z } from "zod";
import { fromError } from "zod-validation-error";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { HTTP_STATUS_CODES, HTTP_STATUS_TYPES } from "@/enums";

export const formatError = (error: any) => {
  const validationError = fromError(error);
  const errors = validationError.details.map((detail) => ({
    ...detail,
    path: detail.path.join(""),
  }));

  return {
    status: HTTP_STATUS_CODES.BAD_REQUEST,
    message: HTTP_STATUS_TYPES.BAD_REQUEST,
    errors,
  };
};

export const checkSchema = <T extends z.ZodTypeAny>(schema: T) => {
  return (async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(request.body);
      return next();
    } catch (error) {
      return response
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json(formatError(error));
    }
  }) as RequestHandler;
};

export const checkFile =
  <T extends z.ZodTypeAny>(schema: T) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(request.file);
      return next();
    } catch (error) {
      console.log(error);
      return response
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json(formatError(error));
    }
  };
