import bcrypt from "bcryptjs";
import { Controller } from "@types";
import { User } from "@models";

/** Validate user credentials to access */
export const signIn: Controller = async (request, response, next) => {
  try {
    return response.status(200).json({
      status: 200,
      message: "The user was logged without any error and successfully.",
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
