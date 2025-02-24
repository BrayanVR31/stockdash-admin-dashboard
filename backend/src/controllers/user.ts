import { jwtDecode, JwtPayload } from "jwt-decode";
import { Types } from "mongoose";
import fs from "fs/promises";
import { Controller, ServerError } from "@/types";
import { HTTP_STATUS_TYPES, HTTP_STATUS_CODES } from "@/enums";
import { User } from "@/models/user";
import { Image } from "@/models/image";
import { destinationPath } from "@/config/multer";

interface JWTInfo extends JwtPayload {
  id: string;
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
    const { id } = jwtDecode(cookies["refresh_token"]) as JWTInfo;

    // Shallowig each nested document
    const { profile = {} } = request.body;
    const prevUser = await User.findById(id).lean();
    const avatar = await Image.findById(profile?.avatar).lean();
    const deepProfile = {
      ...prevUser.profile,
      ...profile,
      avatar: avatar?._id || prevUser.profile.avatar,
      address: {
        ...prevUser.profile.address,
        ...profile.address,
      },
    };
    const deepUser = {
      ...request.body,
      profile: deepProfile,
    };

    // Updating file on disk storage
    if (profile?.avatar) {
      const prevAvatar = prevUser.profile.avatar.toString();
      const newAvatar = profile?.avatar;
      // Remove old image from db
      if (!(prevAvatar === newAvatar)) {
        await Image.findOneAndDelete({
          _id: new Types.ObjectId(prevAvatar),
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, deepUser, {
      returnDocument: "after",
    })
      .populate({
        path: "profile",
        populate: {
          path: "avatar",
          model: "Image",
        },
      })
      .populate({
        path: "rol",
        select: { _id: 0, deletedAt: 0, description: 0 },
      })
      .select({
        password: 0,
        deteledAt: 0,
      });
    return response.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
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
