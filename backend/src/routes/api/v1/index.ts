import { Router, RequestHandler } from "express";
import auth from "./auth";
import system from "./system";
import { authorization } from "@middlewares";

const router = Router();
const prefix = "/v1";

/** Stockdash endpoints (V1) */
router.use(prefix, auth);
router.use(prefix, authorization.verifyAccess as RequestHandler, system);

export default router;
