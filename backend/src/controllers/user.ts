import { jwtDecode, JwtPayload } from "jwt-decode";
import { Types, PopulateOptions } from "mongoose";
import fs from "fs/promises";
import _ from "lodash";
import { Controller, ServerError } from "@/types";
import { HTTP_STATUS_TYPES, HTTP_STATUS_CODES } from "@/enums";
import { User } from "@/models/user";
import { Image } from "@/models/image";
import { destinationPath } from "@/config/multer";
import { handleServerError } from "@/utils/error";

interface JWTInfo extends JwtPayload {
  id: string;
}

interface BaseObject {
  [key: string]: any;
}

// Get all resources
export const home: Controller = async (request, response, next) => {
  try {
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Create a new resource
export const create: Controller = async (request, response, next) => {
  try {
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Edit a specific resource
export const updateProfile: Controller = async (request, response, next) => {
  try {
    const cookies = request.cookies;
    const { id }: JWTInfo = jwtDecode(cookies["refresh_token"]);
    // Query options
    const selectedFields = {
      exclusion: "-password -deletedAt -_id -rol -sessions",
    };
    const foundUser = await User.findById(id)
      .select(selectedFields.exclusion)
      .lean();

    if (Object.keys(request.body).length < 1)
      return response.status(200).json(foundUser);

    const updatedUser = _.merge(foundUser, request.body);
    const returnedUser = await User.findByIdAndUpdate(id, updatedUser, {
      returnDocument: "after",
    }).select(selectedFields.exclusion);
    return response.status(200).json(returnedUser);
  } catch (error) {
    console.log(error);
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

export const viewProfile: Controller = async (request, response) => {
  try {
    // Decoded options from user session
    const cookies = request.cookies;
    const refreshToken: string = cookies["refresh_token"];
    const { id: _id }: JWTInfo = jwtDecode(refreshToken);
    // Query options
    const selectedFields = {
      exclusion: "-password -deletedAt -sessions -_id",
    };
    const populatedRol: PopulateOptions = {
      path: "rol",
      select: {
        _id: 0,
        permissions: 0,
        deletedAt: 0,
        description: 0,
      },
      transform: (doc) => doc.name,
    };
    // ({ ...doc, path: `public/images/${doc.path}` })
    const populatedAvatar: PopulateOptions = {
      path: "profile",
      populate: {
        path: "avatar",
        model: "Image",
        transform: (doc) => {
          doc.path = `public/images/${doc.path}`;
          return doc;
        },
      },
    };

    const user = await User.findOne({ _id })
      .populate(populatedRol)
      .populate(populatedAvatar)
      .select(selectedFields.exclusion);
    return response.status(200).json(user);
  } catch (error) {
    console.log("view profile throw an error: ", error);
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

// Update a specific resource
export const update: Controller = async (request, response, next) => {
  try {
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Delete a specific resource
export const destroy: Controller = async (request, response, next) => {
  try {
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};
