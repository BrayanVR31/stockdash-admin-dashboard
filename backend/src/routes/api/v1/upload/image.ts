import { Router, RequestHandler } from "express";
import multer from "multer";
import {
  uploadImage,
  destroyImage,
  uploadMultiImages,
  getImage,
} from "@/controllers/image";
import { hasAuthorization } from "@/middlewares/rol";
import {
  handleUploadErrors,
  handleMultiUploadErrors,
} from "@/middlewares/file";

const router = Router();
const prefix = "/upload-image";

router.post(
  prefix,
  hasAuthorization("admin", "manager", "employee") as RequestHandler,
  handleUploadErrors,
  uploadImage as RequestHandler,
);

router.post(
  `${prefix}/multi`,
  hasAuthorization("admin", "manager", "employee") as RequestHandler,
  handleMultiUploadErrors,
  uploadMultiImages as RequestHandler,
);

router.delete(
  `${prefix}/:id`,
  hasAuthorization("admin", "manager", "employee") as RequestHandler,
  destroyImage as RequestHandler,
);

router.get(
  `${prefix}/:id`,
  hasAuthorization("admin", "manager", "employee") as RequestHandler,
  getImage as RequestHandler,
);

export { router as imageRouter };
