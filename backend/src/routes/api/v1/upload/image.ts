import { Router, RequestHandler } from "express";
import { destroyFile, getImage, uploadFile } from "@/controllers/image";
import { hasAuthorization } from "@/middlewares/rol";
import {
  handleUploadErrors,
  handleMultiUploadErrors,
} from "@/middlewares/file";
import { multerUpload, getDataUri } from "@/middlewares/multer";
import { uploader } from "@/config/cloudinary";

const router = Router();
const prefix = "/upload";

router.delete(
  `${prefix}/:id`,
  hasAuthorization("admin", "manager", "employee") as RequestHandler,
  destroyFile as RequestHandler,
);

router.get(
  `${prefix}/:id`,
  hasAuthorization("admin", "manager", "employee") as RequestHandler,
  getImage as RequestHandler,
);

router.post(
  "/upload",
  hasAuthorization("admin", "manager", "employee") as RequestHandler,
  multerUpload,
  uploadFile as RequestHandler,
);

export { router as imageRouter };
