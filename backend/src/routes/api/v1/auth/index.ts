import { Router, RequestHandler } from "express";
import { auth } from "@/controllers";
import { authorization } from "@/middlewares";
import { checkSchema } from "@/middlewares/validation";
import { authSchema } from "@/validations/auth";

const router = Router();

/** Auth endpoints */
router.post("/sign-in", checkSchema(authSchema), auth.signIn as RequestHandler);
router.get("/refresh", auth.refreshToken as RequestHandler);
router.get(
  "/log-out",
  authorization.destroySession as RequestHandler,
  auth.logOut as RequestHandler
);
router.get("/profile/:id", auth.getProfile as RequestHandler);

export default router;
