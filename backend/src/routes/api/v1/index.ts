import { Router } from "express";
import auth from "./auth";

const router = Router();
const prefix = "/v1";

/** Stockdash endpoints (V1) */
router.use(prefix, auth);

export default router;
