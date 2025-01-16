import bcrypt from "bcryptjs";
import { Controller, ResponseError, ServerError } from "@/types";
import { User, Token } from "@/models";
import { auth } from "@/utils";

/** Validate user credentials to access */
export const signIn: Controller<ResponseError | any> = async (
  request,
  response,
  next,
) => {
  try {
    const { email, password } = request.body;
    const { error, userRef } = await auth.verifyCredentials({
      email,
      password,
    });

    // Return error when the email and password doesn't match
    if (error) {
      return response.status(401).json({
        error: {
          message: error.message,
          code: error.statusCode,
          title: "Authentication error",
          type: error.type,
        },
      });
    }

    const token = userRef ? (await auth.createAuthToken(userRef)).token : null;
    if (!token)
      return response.status(401).json({
        error: {
          message: "An error occurred while creating the token",
          code: 401,
          title: "Token creation error",
          type: "TOKEN_ERROR",
        },
      });
    // Saved token on cookie
    response.cookie("refresh_token", token.refresh, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    return response.status(200).json({
      message: "The authentication was successfully",
      token: token.access,
      status: 200,
    });
  } catch (error) {}
};

/** Logout of the current user session */
export const logOut: Controller = async (request, response) => {
  try {
    return response.status(200).json({
      status: 200,
      message:
        "The user was log out successfully and now you can close your session.",
    });
  } catch (error) {}
};

/**
 *  Refresh the access token of the current user saved on cookie
 * */
export const refreshToken: Controller = async (request, response) => {
  try {
    const token = await auth.restoreAuthToken(request.cookies["refresh_token"]);
    return response.status(200).json({
      message: "The token was successfully refreshed",
      token,
      status: 200,
    });
  } catch (error) {
    return response.status(401).json({
      error: {
        message: "An error occurred while refreshing the token",
        code: 401,
        title: "Token refresh error",
        type: "TOKEN_ERROR",
      },
    });
  }
};
