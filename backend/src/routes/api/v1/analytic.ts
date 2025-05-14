import { Router, RequestHandler } from "express";
import {
  weeklySales,
  statusProducts,
  productGroupByCategories,
  saleChartByYear,
} from "@/controllers/analytic";

const analyticRouter = Router();
const commonPath = "/analytics";

analyticRouter.get(`${commonPath}/weekly-sales`, weeklySales as RequestHandler);
analyticRouter.get(
  `${commonPath}/weekly-status-products`,
  statusProducts as RequestHandler
);
analyticRouter.get(
  `${commonPath}/group-products-by-category`,
  productGroupByCategories as RequestHandler
);
analyticRouter.get(
  `${commonPath}/sale-chart-by-year`,
  saleChartByYear as RequestHandler
);

export { analyticRouter };
