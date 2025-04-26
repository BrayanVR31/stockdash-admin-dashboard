import { v2 as cloudinary } from "cloudinary";
import { RequestHandler } from "express";
import "dotenv/config";
const { config, uploader } = cloudinary;

export const cloudinaryConfig: RequestHandler = (request, response, next) => {
  config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};

export { uploader };
