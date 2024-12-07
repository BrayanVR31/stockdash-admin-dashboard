import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@models";
const { JWT_SECRET_WORD: secretWord, JWT_EXPIRATION: expiresIn } = process.env;

// Verify user credentials and generate access token
export async function verifyCredentials(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    // Verfify email and password
    if (!user)
      return next(
        new Error("User isn't registered on the system or it's incorrect"),
      );
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) return next(new Error("The password isn't valid"));
    // Generated token
    const token = jwt.sign({ id: user.id }, secretWord!, { expiresIn });
    // Setting token inside cookie
    response.cookie("access-token", token, { httpOnly: true });
    return next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError)
      return response.status(401).json({
        error: {
          message: "The access token is required to access in the system.",
        },
      });
    return response.status(500).json({
      error: {
        message: "The server detects am internal or potential error(s).",
      },
    });
  }
}

// Destroy user session by deleting cookies
export async function destroySession(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const accessToken = request.cookies["access-token"];
    if (!accessToken)
      return response.status(400).json({
        message: "Error, it's impossible to destroy your current session",
      });
    response.clearCookie("access-token");
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
  next: NextFunction,
) {
  try {
    const token = request.cookies["access-token"];
    jwt.verify(token, secretWord!);
    return next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError)
      return response.status(401).json({
        error: {
          message: "The access token is required to access in the system.",
        },
      });
    return response.status(500).json({
      error: {
        message: "The server detects am internal or potential error(s).",
      },
    });
  }
}
