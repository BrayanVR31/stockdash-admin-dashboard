import { Router, RequestHandler } from "express";
import { home, bulkRecords, destroy } from "@/controllers/user";
import { hasAuthorization, hasRole } from "@/middlewares/rol";

const userRouter = Router();
const urlPrefix = "/users";

userRouter.get(
  urlPrefix,
  hasAuthorization("admin") as RequestHandler,
  home as RequestHandler,
);

userRouter.delete(
  `${urlPrefix}/:id`,
  hasAuthorization("admin") as RequestHandler,
  destroy as RequestHandler,
);

userRouter.delete(
  `${urlPrefix}/bulk`,
  hasRole("admin") as RequestHandler,
  bulkRecords as RequestHandler,
);

export { userRouter };
