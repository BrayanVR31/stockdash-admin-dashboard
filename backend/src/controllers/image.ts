import { Response, Request } from "express";
import multer from "multer";
import { imageFilter } from "@/utils/file";
import { Controller } from "@/types/controller";
import { Image } from "@/models/image";
import { handleServerError } from "@/utils/error";
import {
  getServerError,
  HTTP_STATUS_TYPES as STATUS_TYPES,
} from "@/utils/statusCodes";
import { getDataUri } from "@/middlewares/multer";
import { uploader } from "@/config/cloudinary";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 3_145_728,
  },
});

const singleUpload = upload.single("image");
const multiUpload = upload.array("images", 7);

const handlingUploadErrors =
  (request: Request, response: Response) => async (error: any) => {
    // Handling upload error file
    if (error instanceof multer.MulterError) {
      const messages = {
        LIMIT_FILE_SIZE: "The file is too large. The maximum size is 3MB.",
      };
      return response.status(400).json({
        error: {
          message: messages[error.code],
          type: "ERROR_UPLOADING_FILE",
          code: 400,
        },
      });
    } else if (error)
      return response.status(400).json({
        error: {
          message: (error as Error).message || "File uploaded error.",
          type: "ERROR_UPLOADING_FILE",
          code: 400,
        },
      });

    // Uploading files on db and disk storage
    if (!request.file)
      return response.status(400).json({
        error: {
          message: "The image input is required.",
          type: "ERROR_UPLOADING_FILE",
          code: 400,
        },
      });

    return null;
  };

export const destroyFile: Controller = async (request, response) => {
  try {
    const image = await Image.findByIdAndDelete(request.params.id);
    if (!image) {
      const [status, errorResponse] = getServerError(
        STATUS_TYPES.FILE_NOT_FOUND,
      );
      return response.status(status).json(errorResponse);
    }
    const deletedFile = await uploader.destroy(image.refId);
    if (!!deletedFile) {
      const [status, errorResponse] = getServerError(
        STATUS_TYPES.FAILED_UPLOAD_DELETION,
      );
      return response.status(status).json(errorResponse);
    }
    return response.status(204).end();
  } catch (error) {
    const [status, errorResponse] = handleServerError(error);
    return response.status(status).json(errorResponse);
  }
};

export const getImage: Controller = async (request, response) => {
  try {
    const image = await Image.findById(request.params.id);
    if (!image) {
      const [status, errorResponse] = getServerError(
        STATUS_TYPES.FILE_NOT_FOUND,
      );
      return response.status(status).json(errorResponse);
    }
    return response.status(200).json(image);
  } catch (error) {
    const [status, errorResponse] = handleServerError(error);
    return response.status(status).json(errorResponse);
  }
};

export const uploadFile: Controller = async (request, response) => {
  try {
    if (!request.file) {
      const [status, errorResponse] = getServerError(
        STATUS_TYPES.REQUIRED_FILE,
      );
      return response.status(status).json(errorResponse);
    }
    // Upload file on cloudinary service
    const file = getDataUri(request).content;
    const uploadedFile = await uploader.upload(file);
    if (!uploadFile) {
      const [status, errorResponse] = getServerError(
        STATUS_TYPES.FAILED_UPLOAD,
      );
      return response.status(status).json(errorResponse);
    }
    const dbImage = new Image();
    dbImage.path = uploadedFile.secure_url;
    dbImage.extension = uploadedFile.format;
    dbImage.size = uploadedFile.bytes;
    dbImage.refId = uploadedFile.public_id;
    await dbImage.save();
    return response.status(201).json(dbImage);
  } catch (error) {
    const [status, errorResponse] = handleServerError(error);
    return response.status(status).json(errorResponse);
  }
};
