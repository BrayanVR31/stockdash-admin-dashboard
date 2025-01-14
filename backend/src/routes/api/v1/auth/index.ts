import { Router, RequestHandler } from "express";
import { auth } from "@/controllers";
import { authorization } from "@/middlewares";

const router = Router();

/** Auth endpoints */
router.post("/sign-in", auth.signIn as RequestHandler);
router.get("/refresh", auth.refreshToken as RequestHandler);
router.get(
  "/log-out",
  authorization.destroySession as RequestHandler,
  auth.logOut as RequestHandler,
);

export default router;
