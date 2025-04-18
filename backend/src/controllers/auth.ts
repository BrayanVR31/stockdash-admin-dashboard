import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Controller, ResponseError, ServerError } from "@/types";
import { User, Token } from "@/models";
import { Session } from "@/models/session";
import { auth } from "@/utils";
import {
  getServerError,
  HTTP_STATUS_TYPES as ERROR_TYPES,
} from "@/utils/statusCodes";
import { handleServerError } from "@/utils/error";

const { JWT_SECRET_WORD = "JWT_PASS" } = process.env;

/** Validate user credentials to access */
export const signIn: Controller<ResponseError | any> = async (
  request,
  response,
  next
) => {
  try {
    const authUser = await User.findOne({ email: request.body.email });
    const expiredAt = +new Date() + 7 * 24 * 60 * 60 * 1_000; // 7 days

    const sessions = await Session.find();
    console.log(sessions);

    // Access and cookie token when user log in a new session
    const accessToken = jwt.sign({ id: authUser.id }, JWT_SECRET_WORD, {
      expiresIn: 15 * 60, // 15 min.
    });
    const cookieToken = jwt.sign({ id: authUser.id }, JWT_SECRET_WORD, {
      expiresIn: "7d",
    });
    await Token.create({
      userId: authUser.id,
      token: cookieToken,
      expiredAt,
    });
    response.cookie("refresh_token", cookieToken, {
      httpOnly: true,
      maxAge: 3_600_000 * 24 * 7, // 7 days
    });

    return response.status(200).json({
      token: accessToken,
    });
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

/** Logout of the current user session */
export const logOut: Controller = async (request, response) => {
  try {
    const tokens = await Token.find();
    const cookieToken = request.cookies["refresh_token"];
    const authToken = await Token.findOneAndDelete({ token: cookieToken });
    if (!authToken) {
      const [status, serverError] = getServerError(ERROR_TYPES.EXPIRED_SESSION);
      return response.status(status).json(serverError);
    }
    response.clearCookie("refresh_token");

    return response.status(200).json({
      status: 200,
      message:
        "The user was log out successfully and now you can close your session.",
    });
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

/**
 *  Refresh the access token of the current user saved on cookie
 * */
export const refreshToken: Controller = async (request, response) => {
  try {
    const cookieToken = request.cookies["refresh_token"];
    if (!cookieToken) {
      const [status, serverError] = getServerError(ERROR_TYPES.EXPIRED_SESSION);
      return response.status(status).json(serverError);
    }

    // Create a new access token and check the availability from db
    const storedToken = await Token.findOne({ token: cookieToken });
    if (!storedToken) {
      const [status, serverError] = getServerError(
        ERROR_TYPES.TOKEN_EXPIRATION
      );
      return response.status(status).json(serverError);
    }
    const { JWT_SECRET_WORD: secretWord = "JWT_PASS" } = process.env;
    const payload = jwt.verify(storedToken.token, secretWord);
    const token = jwt.sign({ id: (payload as jwt.JwtPayload).id }, secretWord, {
      expiresIn: 15 * 60, // 15 minutes
    });

    return response.status(200).json({
      message: "The token was successfully refreshed",
      token,
      status: 200,
    });
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

/**
 * Get all user information by reference account (id)
 */
export const getProfile: Controller = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id).select({
      password: 0,
      deletedAt: 0,
      sessions: 0,
    });
    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
