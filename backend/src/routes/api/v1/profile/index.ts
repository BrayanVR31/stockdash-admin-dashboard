import { Router, RequestHandler } from "express";
import { updateProfile } from "@/controllers/user";
import { checkSchema } from "@/middlewares/validation";
import { deepAccountPartial } from "@/validations/account";

const router = Router();
const prefix = "/profile";

// Route's group
router.patch(
  `${prefix}/account`,
  checkSchema(deepAccountPartial),
  updateProfile as RequestHandler,
);

export default router;
