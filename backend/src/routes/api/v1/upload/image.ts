import { Router, RequestHandler } from "express";
import multer from "multer";
import {
  uploadImage,
  destroyImage,
  uploadMultiImages,
} from "@/controllers/image";
import { storage } from "@/config/multer";

const router = Router();
const prefix = "/upload-image";
const upload = multer({ storage });

router.post(prefix, upload.single("image"), uploadImage as RequestHandler);
router.post(
  `${prefix}/multi`,
  upload.array("images", 7),
  uploadMultiImages as RequestHandler
);
router.delete(`${prefix}/:id`, destroyImage as RequestHandler);

export { router as imageRouter };
