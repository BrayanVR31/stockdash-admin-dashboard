import multer from "multer";
import { Request } from "express";
import path from "path";
import datauri from "datauri";
import DatauriParser from "datauri/parser";
import { imageFilter } from "@/utils/file";

const storage = multer.memoryStorage();
const fileSize = 1_048_576;
const multerUpload = multer({
  storage,
  limits: {
    fileSize,
  },
  fileFilter: imageFilter,
}).single("image");
const parser = new DatauriParser();

export const getDataUri = (request: Request) =>
  parser.format(path.extname(request.file.originalname), request.file.buffer);

export { multerUpload };
