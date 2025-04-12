import { Express, Response, Request } from "express";
import multer from "multer";
import { storage } from "@/config/multer";
import { imageFilter } from "@/utils/file";
import { Controller } from "@/types/controller";
import { Image, ImageExt, IImage } from "@/models/image";
import { getExtensionFile, removeFile } from "@/utils/file";
import { handleServerError } from "@/utils/error";
import {
  getServerError,
  HTTP_STATUS_TYPES as STATUS_TYPES,
} from "@/utils/statusCodes";

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

const uploadImage: Controller = async (request, response) => {
  try {
    const image = new Image();
    image.path = request.file.filename;
    image.extension = getExtensionFile(request.file.filename) as ImageExt;
    image.size = request.file.size;
    await image.save();
    return response.status(201).json(image);
  } catch (error) {
    const [status, errorResponse] = handleServerError(error);
    return response.status(status).json(errorResponse);
  }
};

const destroyImage: Controller = async (request, response) => {
  try {
    const image = await Image.findByIdAndDelete(request.params.id);
    if (!image) {
      const [status, errorResponse] = getServerError(
        STATUS_TYPES.FILE_NOT_FOUND,
      );
      return response.status(status).json(errorResponse);
    }
    await removeFile(image.path, "images");
    return response.status(204).end();
  } catch (error) {
    const [status, errorResponse] = handleServerError(error);
    return response.status(status).json(errorResponse);
  }
};

const uploadMultiImages: Controller = async (request, response) => {
  try {
    // Handling multi uloading files
    const images: IImage[] = (request.files as Express.Multer.File[]).map(
      (file) => ({
        path: file.filename,
        extension: getExtensionFile(file.path) as ImageExt,
        size: file.size,
      }),
    );
    const results = await Image.create(images);
    return response
      .status(201)
      .json({ results, message: "All images were uploaded successfully" });
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

export { uploadImage, destroyImage, uploadMultiImages };
