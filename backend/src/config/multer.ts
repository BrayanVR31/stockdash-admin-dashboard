import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const destinationPath = path.join(
  process.cwd(),
  "/public",
  "/assets",
  "images"
);

console.log({ destinationPath });
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, destinationPath);
  },
  filename: (request, file, cb) => {
    const splittedName = file.originalname.split(".");
    cb(
      null,
      `${uuidv4()}-${file.fieldname}.${splittedName[splittedName.length - 1]}`
    );
  },
});

export { storage };
