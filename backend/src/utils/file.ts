import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { Request, Express } from "express";
import { FileFilterCallback } from "multer";

const getExtensionFile = (filename: string) => {
  const splittedFile = filename.split(".");
  return splittedFile[splittedFile.length - 1];
};

/**
 * Remove an existing file by default
 * the parent path is placed on public/assets/
 */
const removeFile = async (filename: string, subPath: string) => {
  const defaultPath = path.join(
    process.cwd(),
    "/public",
    "/assets",
    subPath,
    filename,
  );

  if (existsSync(defaultPath)) {
    await fs.rm(defaultPath);
    return true;
  } else {
    throw new Error("The directory's file doesn't exist on current path");
  }
};

const imageFilter = (
  request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  // File image extension verification
  const [result] = [...file.mimetype.matchAll(/(?<=\/)png|jpg|jpeg$/g)];
  const extension = result?.[0] || null;
  if (!extension)
    return cb(
      new Error(
        "The image must be have the following extensions png, jpg, jpeg.",
      ),
    );

  cb(null, true);
};

export { getExtensionFile, removeFile, imageFilter };
