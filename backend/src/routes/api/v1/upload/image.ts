import { Router, RequestHandler } from "express";
import multer from "multer";
import {
  uploadImage,
  destroyImage,
  uploadMultiImages,
} from "@/controllers/image";
import { storage } from "@/config/multer";
import { hasAuthorization } from "@/middlewares/rol";

const router = Router();
const prefix = "/upload-image";
const upload = multer({ storage });

router.post(
  prefix,
  hasAuthorization("admin", "manager", "employee") as RequestHandler,
  upload.single("image"),
  uploadImage as RequestHandler
);
router.post(
  `${prefix}/multi`,
  hasAuthorization("admin", "manager", "employee") as RequestHandler,
  upload.array("images", 7),
  uploadMultiImages as RequestHandler
);
router.delete(
  `${prefix}/:id`,
  hasAuthorization("admin", "manager", "employee") as RequestHandler,
  destroyImage as RequestHandler
);

export { router as imageRouter };
