import { Router } from "express";
import v1 from "./v1";

const router = Router();
const prefix = "/api";

router.use(prefix, v1);

export default router;
