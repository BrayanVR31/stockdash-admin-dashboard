import { Router, RequestHandler } from "express";
import { updateProfile, viewProfile } from "@/controllers/user";
import { checkSchema } from "@/middlewares/validation";
import { hasRole } from "@/middlewares/rol";
import { deepAccountPartial } from "@/validations/account";

const router = Router();
const prefix = "/account";

// Route's group
router.patch(
  prefix,
  hasRole("manager", "admin", "employee") as RequestHandler,
  checkSchema(deepAccountPartial),
  updateProfile as RequestHandler
);
//router.get(`${prefix}/account`, viewProfile as RequestHandler);
router.get(
  prefix,
  hasRole("manager", "admin", "employee") as RequestHandler,
  viewProfile as RequestHandler
);

export default router;
