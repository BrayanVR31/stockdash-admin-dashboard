import { Router } from "express";
import auth from "./auth";
import system from "./system";

const router = Router();
const prefix = "/v1";

/** Stockdash endpoints (V1) */
router.use(prefix, auth, system);

export default router;
