import { Router, RequestHandler } from "express";
import {
  weeklySales,
  statusProducts,
  productGroupByCategories,
  saleChartByYear,
  getSalesYear,
  getCategoriesByProduct,
  getProductBarGroupByCategories,
  getAnnualPurchases,
  getCountOverview,
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
analyticRouter.get(
  `${commonPath}/sale-chart-by-year`,
  saleChartByYear as RequestHandler,
);
analyticRouter.get(`${commonPath}/sale-years`, getSalesYear as RequestHandler);
analyticRouter.get(
  `${commonPath}/product-categories`,
  getCategoriesByProduct as RequestHandler,
);
analyticRouter.get(
  `${commonPath}/all-products-group-category`,
  getProductBarGroupByCategories as RequestHandler,
);
analyticRouter.get(
  `${commonPath}/annual-purchases`,
  getAnnualPurchases as RequestHandler,
);
analyticRouter.get(
  `${commonPath}/count-overview`,
  getCountOverview as RequestHandler,
);

export { analyticRouter };
