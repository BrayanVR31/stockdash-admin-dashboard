import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";

export const destinationPath = path.join(
  process.cwd(),
  "/public",
  "/assets",
  "images",
);

console.log({ destinationPath });
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    if (!fs.existsSync(destinationPath))
      cb(new Error("Failed to upload the file."), null);
    cb(null, destinationPath);
  },
  filename: (request, file, cb) => {
    const splittedName = file.originalname.split(".");
    cb(
      null,
      `${uuidv4()}-${file.fieldname}.${splittedName[splittedName.length - 1]}`,
    );
  },
});

export { storage };
