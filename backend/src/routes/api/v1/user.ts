import { Router, RequestHandler } from "express";
import { home, bulkRecords, destroy } from "@/controllers/user";
import { hasRole } from "@/middlewares/rol";

const userRouter = Router();
const urlPrefix = "/users";

userRouter.get(
  urlPrefix,
  hasRole("admin") as RequestHandler,
  home as RequestHandler,
);

userRouter.delete(
  `${urlPrefix}/:id`,
  hasRole("admin") as RequestHandler,
  destroy as RequestHandler,
);

userRouter.delete(
  `${urlPrefix}/bulk`,
  hasRole("admin") as RequestHandler,
  bulkRecords as RequestHandler,
);

export { userRouter };
