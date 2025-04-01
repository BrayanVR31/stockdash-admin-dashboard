import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { Error as MongoError } from "mongoose";
import { HTTP_STATUS_TYPES, getServerError } from "@/utils/statusCodes";

export const handleServerError = (error: any) => {
  console.log(error);
  // JWT errors
  if (error instanceof TokenExpiredError)
    return getServerError(HTTP_STATUS_TYPES.TOKEN_EXPIRATION);
  else if (error instanceof JsonWebTokenError)
    return getServerError(HTTP_STATUS_TYPES.INVALID_TOKEN_SIGNATURE);
  // Mongo DB errors
  else if (error instanceof MongoError.CastError) {
    return getServerError(HTTP_STATUS_TYPES.CAST_OBJECT_ID_ERROR);
  }
  // Default error
  return getServerError(HTTP_STATUS_TYPES.INTERNAL_SERVER_ERROR);
};
