import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { storage } from "@/config/multer";
import { imageFilter } from "@/utils/file";

const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 3_145_728,
  },
});
const singleUpload = upload.single("image");
const multiUpload = upload.array("images", 7);

const handleUploadErrors = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  singleUpload(request, response, (error) => {
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

    return next();
  });
};

const handleMultiUploadErrors = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  multiUpload(request, response, (error) => {
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
    if (request.files.length === 0) {
      return response.status(400).json({
        error: {
          message: "The images input is required.",
          type: "ERROR_UPLOADING_FILE",
          code: 400,
        },
      });
    }

    return next();
  });
};

export { handleUploadErrors, handleMultiUploadErrors };
