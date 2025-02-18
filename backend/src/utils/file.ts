import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

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
    filename
  );

  if (existsSync(defaultPath)) {
    await fs.rm(defaultPath);
    return true;
  } else {
    throw new Error("The directory's file doesn't exist on current path");
  }
};

export { getExtensionFile, removeFile };
