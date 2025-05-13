import { Router, RequestHandler } from "express";
import {
  weeklySales,
  statusProducts,
  productGroupByCategories,
} from "@/controllers/analytic";

const analyticRouter = Router();
const commonPath = "/analytics";

analyticRouter.get(`${commonPath}/weekly-sales`, weeklySales as RequestHandler);
analyticRouter.get(
  `${commonPath}/weekly-status-products`,
  statusProducts as RequestHandler,
);
analyticRouter.get(
  `${commonPath}/group-products-by-category`,
  productGroupByCategories as RequestHandler,
);

export { analyticRouter };
