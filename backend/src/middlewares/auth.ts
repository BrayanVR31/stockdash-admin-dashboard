import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "@/models";
import { Token } from "@/models/token";
import { ServerError } from "@/types";
import { HTTP_STATUS_CODES, HTTP_STATUS_TYPES } from "@/enums";
const { JWT_SECRET_WORD: secretWord, JWT_EXPIRATION: expiresIn } = process.env;

// Verify user credentials and generate access token
export async function verifyCredentials(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const serverError = new Error("") as ServerError;
  try {
    const { email, password } = request.body;
    // TODO: create an intial trigger to register admin user (mongodb)
    const users = await User.find();
    if (users.length === 0) {
      const user = new User();
      user.email = email;
      user.password = password;
      await user.save();
    }

    const user = await User.findOne({ email });
    // Verfify email and password
    if (!user) {
      serverError.title = "Invalid credentials";
      serverError.status = HTTP_STATUS_CODES.UNAUTHORIZED;
      serverError.message = HTTP_STATUS_TYPES.UNAUTHORIZED;
      serverError.jsonKey = "error";
      return next(serverError);
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      serverError.title = "Invalid credentials";
      serverError.status = HTTP_STATUS_CODES.UNAUTHORIZED;
      serverError.message = HTTP_STATUS_TYPES.UNAUTHORIZED;
      serverError.jsonKey = "error";
      return next(serverError);
    }
    // Generated token
    // const token = jwt.sign({ id: user.id }, secretWord, { expiresIn });
    const token = jwt.sign({}, secretWord, {
      expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
    });
    // Setting token inside cookie
    response.cookie("access-token", token, { httpOnly: true });
    return response.status(HTTP_STATUS_CODES.OK).json({
      status: HTTP_STATUS_CODES.OK,
      message: "The user was logged without any error and successfully.",
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      serverError.title = "JWT error";
      serverError.status = HTTP_STATUS_CODES.UNAUTHORIZED;
      serverError.message = HTTP_STATUS_TYPES.JWT_ERROR;
      serverError.jsonKey = "error";
      return next(serverError);
    }
    serverError.title = "Internal server error";
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
}

// Destroy user session by deleting cookies
export async function destroySession(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const accessToken = request.cookies;
    if (!accessToken["refresh_token"])
      return response.status(400).json({
        error: {
          title: "Failed to destroy the session",
          message: "Error, it's impossible to destroy your current session",
          code: 400,
          type: "IMPOSSIBLE_LOGOUT",
        },
      });
    return next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: {
        message: "The server detects am internal or potential error(s).",
      },
    });
  }
}

// Verify token structure and current session
export async function verifyAccess(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log("middleware - verifying jwt...");
    // Token structure verification
    const bearerToken = (request.headers.authorization ?? "").split("Bearer ");
    const parsedToken = bearerToken.slice(1).join("");
    if (!parsedToken)
      return response.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
        error: {
          message: "You need to provide a token to access this resource",
          title: "No token provided",
          code: HTTP_STATUS_CODES.UNAUTHORIZED,
          type: HTTP_STATUS_CODES[HTTP_STATUS_CODES.UNAUTHORIZED],
        },
      });

    // Check if the token are available on database from cookie session
    const cookies = request.cookies;
    const persistToken = await Token.findOne({
      token: cookies["refresh_token"],
    });
    if (!persistToken)
      return response.status(401).json({
        error: {
          message: "Your session was expired, please login again",
          title: "Session expired",
          code: 401,
          type: "SESSION_EXPIRED",
        },
      });
    // Token verification
    jwt.verify(parsedToken, secretWord!);
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
        error: {
          title: "Expiration token signature",
          message: HTTP_STATUS_TYPES.JWT_EXPIRATION,
          code: HTTP_STATUS_CODES.UNAUTHORIZED,
          type: "TOKEN_EXPIRATION",
        },
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
        error: {
          title: error.message,
          message: "Invalid token signature",
          code: HTTP_STATUS_CODES.UNAUTHORIZED,
          type: HTTP_STATUS_CODES[HTTP_STATUS_CODES.UNAUTHORIZED],
        },
      });
    }
    return response.status(HTTP_STATUS_CODES.SERVER_ERROR).json({
      error: {
        title: "Internal server error",
        message: HTTP_STATUS_TYPES.SERVER_ERROR,
        code: HTTP_STATUS_CODES.SERVER_ERROR,
        type: HTTP_STATUS_CODES[HTTP_STATUS_CODES.SERVER_ERROR],
      },
    });
  }
}
