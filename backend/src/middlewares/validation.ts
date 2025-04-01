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

interface SchemaOptions {
  response: {
    statusCode?: number;
    failedErrorType?: string;
  };
}

export const checkSchema = <T extends z.ZodTypeAny>(
  schema: T,
  options?: SchemaOptions,
) => {
  return (async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(request.body);
      return next();
    } catch (error) {
      const {
        statusCode = HTTP_STATUS_CODES.BAD_REQUEST,
        failedErrorType = "VALIDATION_ERROR",
      } = options?.response || {};
      const validationErrors = formatError(error);
      const emailType =
        validationErrors.errors.some(
          (error) => error.code === "custom" && error.path === "email",
        ) && "INVALID_EMAIL";
      const passType =
        validationErrors.errors.some(
          (error) => error.code === "custom" && error.path === "password",
        ) && "INVALID_PASSWORD";
      return response.status(statusCode).json({
        error: {
          ...validationErrors,
          status: statusCode,
          type: emailType || passType || failedErrorType,
        },
      });
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
