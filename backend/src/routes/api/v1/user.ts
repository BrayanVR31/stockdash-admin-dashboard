import { Router, RequestHandler } from "express";
import {
  home,
  bulkRecords,
  destroy,
  create,
  update,
  edit,
} from "@/controllers/user";
import { hasRole } from "@/middlewares/rol";
import { checkSchema } from "@/middlewares/validation";
import { userSchema, partialUserSchema } from "@/validations/user";

const userRouter = Router();
const urlPrefix = "/users";

userRouter.get(
  urlPrefix,
  hasRole("admin") as RequestHandler,
  home as RequestHandler,
);

userRouter.get(
  `${urlPrefix}/:id`,
  hasRole("admin") as RequestHandler,
  edit as RequestHandler,
);

userRouter.post(
  urlPrefix,
  hasRole("admin") as RequestHandler,
  checkSchema(userSchema),
  create as RequestHandler,
);

userRouter.put(
  `${urlPrefix}/:id`,
  hasRole("admin") as RequestHandler,
  checkSchema(partialUserSchema),
  update as RequestHandler,
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
