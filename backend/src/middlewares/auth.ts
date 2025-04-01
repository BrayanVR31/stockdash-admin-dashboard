import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Token } from "@/models/token";
import {
  HTTP_STATUS_TYPES as ERROR_TYPES,
  getServerError,
} from "@/utils/statusCodes";
import { handleServerError } from "@/utils/error";

const { JWT_SECRET_WORD: secretWord, JWT_EXPIRATION: expiresIn } = process.env;

// Destroy user session by deleting cookies
export async function destroySession(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const accessToken = request.cookies;
    if (!accessToken["refresh_token"]) {
      const [status, serverError] = getServerError(
        ERROR_TYPES.EXISTING_LOG_OUT,
      );
      return response.status(status).json(serverError);
    }
    return next();
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
}

// Verify token structure and current session
export async function verifyAccess(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    // Check if the token are available on database from cookie session
    const cookies = request.cookies;
    const persistToken = await Token.findOne({
      token: cookies["refresh_token"],
    });
    if (!persistToken) {
      const [status, serverError] = getServerError(ERROR_TYPES.EXPIRED_SESSION);
      return response.status(status).json(serverError);
    }

    // Token structure verification
    const bearerToken = (request.headers.authorization ?? "").split("Bearer ");
    const parsedToken = bearerToken.slice(1).join("");
    if (!parsedToken) {
      const [status, serverError] = getServerError(ERROR_TYPES.REQUIRED_TOKEN);
      return response.status(status).json(serverError);
    }

    if (parsedToken === persistToken.token) {
      const [status, serverError] = getServerError(
        ERROR_TYPES.INVALID_TOKEN_SIGNATURE,
      );
      return response.status(status).json(serverError);
    }

    // Token verification
    jwt.verify(parsedToken, secretWord!);
    return next();
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
}
