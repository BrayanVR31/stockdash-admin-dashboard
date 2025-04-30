import { jwtDecode, JwtPayload } from "jwt-decode";
import { Types, PopulateOptions } from "mongoose";
import fs from "fs/promises";
import _ from "lodash";
import { Controller, ServerError } from "@/types";
import { HTTP_STATUS_CODES } from "@/enums";
import { User } from "@/models/user";
import { Image } from "@/models/image";
import { destinationPath } from "@/config/multer";
import { handleServerError } from "@/utils/error";
import { HTTP_STATUS_TYPES, getServerError } from "@/utils/statusCodes";
import { paginateDocs } from "@/utils";

interface JWTInfo extends JwtPayload {
  id: string;
}

interface BaseObject {
  [key: string]: any;
}

// Get all resources
export const home: Controller = async (request, response, next) => {
  try {
    const currentUserId = jwtDecode(request.cookies["refresh_token"])[
      "id"
    ] as string;
    // Pagination configuration
    const total = await User.countDocuments({
      _id: {
        $ne: currentUserId,
      },
    });
    const { per_page, page, with_pagination = "1" } = request.query;
    if (with_pagination === "0") {
      const data = await User.find();
      return response.status(HTTP_STATUS_CODES.OK).json(data);
    }
    const { skipDocument, perPage } = paginateDocs(total, per_page, page);
    const populatedImage: PopulateOptions = {
      path: "profile.avatar",
      strictPopulate: false,
    };
    const populatedRol: PopulateOptions = {
      path: "rol",
      strictPopulate: false,
      select: "name -_id",
      transform: (doc) => doc.name,
    };
    const results = await User.find({
      _id: { $ne: currentUserId },
    })
      .populate(populatedImage)
      .populate(populatedRol)
      .skip(skipDocument)
      .limit(perPage);
    return response.status(200).json({
      results,
      total,
      subtotal: results.length,
      page: per_page && !page ? 1 : +page,
      per_page: perPage,
    });
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

// Create a new resource
export const create: Controller = async (request, response, next) => {
  try {
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
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
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

// Delete a specific resource
export const destroy: Controller = async (request, response, next) => {
  try {
    const currentUserId = jwtDecode(request.cookies["refresh_token"])[
      "id"
    ] as string;
    const userId = request.params.id;
    const result = await User.deleteOne({
      _id: {
        $eq: userId,
        $ne: currentUserId,
      },
    });
    if (result.deletedCount <= 0) {
      const [status, serverError] = getServerError(
        HTTP_STATUS_TYPES.ERROR_REMOVING_FILE,
      );
      return response.status(status).json(serverError);
    }
    return response.status(204).end();
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

export const bulkRecords: Controller = async (request, response) => {
  try {
    const currentUserId = jwtDecode(request.cookies["refresh_token"])[
      "id"
    ] as string;
    const userIds = request.body.ids as string[];
    const result = await User.deleteMany({
      _id: {
        $in: userIds,
        $ne: currentUserId,
      },
    });

    if (result.deletedCount <= 0) {
      const [status, serverError] = getServerError(
        HTTP_STATUS_TYPES.ERROR_REMOVING_FILE,
      );
      return response.status(status).json(serverError);
    }
    return response.status(204).end();
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};
