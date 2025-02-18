import { Express } from "express";
import { Controller } from "@/types/controller";
import { Image, ImageExt, IImage } from "@/models/image";
import { getExtensionFile, removeFile } from "@/utils/file";

const uploadImage: Controller = async (request, response) => {
  try {
    console.log(request.file.filename);
    const image = new Image();
    image.path = request.file.filename;
    image.extension = getExtensionFile(request.file.filename) as ImageExt;
    image.size = request.file.size;
    await image.save();
    return response.status(201).json(image);
  } catch (error) {
    return response.status(500).json({
      error: {
        message:
          "An unexpected error occurred on the server. Please try again later.",
        type: "INTERNAL_SERVER_ERROR",
        code: 500,
      },
    });
  }
};

const destroyImage: Controller = async (request, response) => {
  try {
    const image = await Image.findByIdAndDelete(request.params.id);
    if (!image)
      return response.status(404).json({
        error: {
          message:
            "The requested image does not exist or could not be located.",
          type: "IMAGE_NOT_FOUND",
          code: 404,
        },
      });
    await removeFile(image.path, "images");
    return response.status(204).end();
  } catch (error) {
    return response.status(500).json({
      error: {
        message:
          "An unexpected error occurred on the server. Please try again later.",
        type: "INTERNAL_SERVER_ERROR",
        code: 500,
      },
    });
  }
};

const uploadMultiImages: Controller = async (request, response) => {
  try {
    const images: IImage[] = (request.files as Express.Multer.File[]).map(
      (file) => ({
        path: file.path,
        extension: getExtensionFile(file.path) as ImageExt,
        size: file.size,
      })
    );
    const results = await Image.create(images);
    return response
      .status(201)
      .json({ results, message: "All images were uploaded successfully" });
  } catch (error) {
    return response.status(500).json({
      error: {
        message:
          "An unexpected error occurred on the server. Please try again later.",
        type: "INTERNAL_SERVER_ERROR",
        code: 500,
      },
    });
  }
};

export { uploadImage, destroyImage, uploadMultiImages };
