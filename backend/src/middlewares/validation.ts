import { z } from "zod";
import { fromError } from "zod-validation-error";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { HTTP_STATUS_CODES, HTTP_STATUS_TYPES } from "@/enums";

export const checkSchema = <T extends z.ZodTypeAny>(schema: T) => {
  return (async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(request.body);
      return next();
    } catch (error) {
      const validationError = fromError(error);
      const errors = validationError.details.map((detail) => ({
        ...detail,
        path: detail.path.join(""),
      }));
      return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        status: HTTP_STATUS_CODES.BAD_REQUEST,
        message: HTTP_STATUS_TYPES.BAD_REQUEST,
        errors,
      });
    }
  }) as RequestHandler;
};
