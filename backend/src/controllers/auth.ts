import jwt from "jsonwebtoken";
import { Controller, ResponseError, ServerError } from "@/types";
import { User, Token } from "@/models";
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
  next,
) => {
  try {
    // Access token (temporary)
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    const dbToken = await Token.findOne({
      userId: user._id,
      expiredAt: { $gte: Date.now() },
    });

    console.log(request.headers["user-agent"]);
    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET_WORD, {
      expiresIn: 15 * 60, // 15 min.
    });

    // Compare if the token hasn't been expired and return it
    if (dbToken) {
      response.cookie("refresh_token", dbToken.token, {
        httpOnly: true,
        expires: dbToken.expiredAt,
      });
      return response.status(200).json({
        token: accessToken,
      });
    }

    // Create a new persistent token
    const currentDate = new Date();
    const expiredAt = new Date(currentDate);
    expiredAt.setDate(currentDate.getDate() + 7);
    const createdToken = jwt.sign({ id: user._id }, JWT_SECRET_WORD, {
      expiresIn: "7d",
    });
    await Token.create({
      userId: user._id,
      token: createdToken,
      // expiredAt: expiredAt, // 7 days
    });
    response.cookie("refresh_token", createdToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
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
        ERROR_TYPES.TOKEN_EXPIRATION,
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
