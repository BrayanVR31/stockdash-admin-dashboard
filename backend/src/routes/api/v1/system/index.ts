import { Router, RequestHandler } from "express";
import { category, supplier, product, sale, purchase } from "@/controllers";
import { validation } from "@/middlewares";
import {
  categoryValid,
  supplierValid,
  productValid,
  purchaseValid,
  saleValid,
} from "@/validations";
import { imageRouter } from "@/routes/api/v1/upload";
import { hasRole } from "@/middlewares/rol";
import profile from "@/routes/api/v1/profile";
import { analyticRouter } from "@/routes/api/v1/analytic";

const router = Router();

/** Category endpoints */
const categoryPath = "/categories";
router.get(categoryPath, category.home as RequestHandler);
router.post(
  categoryPath,
  validation.checkSchema(categoryValid.schema),
  category.create as RequestHandler,
);
router.get(`${categoryPath}/:id`, category.edit as RequestHandler);
router.put(`${categoryPath}/:id`, category.update as RequestHandler);
router.delete(`${categoryPath}/:id`, category.destroy as RequestHandler);

/** Supplier endpoints */
const supplierPath = "/suppliers";
router.get(
  supplierPath,
  hasRole("admin", "manager") as RequestHandler,
  supplier.home as RequestHandler,
);
router.post(
  supplierPath,
  hasRole("admin", "manager") as RequestHandler,
  validation.checkSchema(supplierValid.schema),
  supplier.create as RequestHandler,
);
router.get(
  `${supplierPath}/:id`,
  hasRole("admin", "manager") as RequestHandler,
  supplier.edit as RequestHandler,
);
router.patch(
  `${supplierPath}/:id`,
  hasRole("admin", "manager") as RequestHandler,
  supplier.update as RequestHandler,
);
router.delete(`${supplierPath}/:id`, supplier.destroy as RequestHandler);
router.post(
  `${supplierPath}/bulk-delete`,
  validation.checkSchema(supplierValid.bulkDeleteSchema),
  supplier.bulkDestroy as RequestHandler,
);

/** Product endpoints */
const productPath = "/products";
router.get(
  productPath,
  hasRole("admin", "manager", "employee") as RequestHandler,
  product.home as RequestHandler,
);
router.post(
  productPath,
  hasRole("admin", "manager") as RequestHandler,
  validation.checkSchema(productValid.schema),
  product.create as RequestHandler,
);
router.get(
  `${productPath}/:id`,
  hasRole("admin", "manager", "employee") as RequestHandler,
  product.edit as RequestHandler,
);
router.patch(
  `${productPath}/:id`,
  hasRole("admin", "manager") as RequestHandler,
  product.update as RequestHandler,
);
router.delete(
  `${productPath}/:id`,
  hasRole("admin", "manager") as RequestHandler,
  product.destroy as RequestHandler,
);

/** Sale endpoints */
const salePath = "/sales";
router.get(
  salePath,
  hasRole("admin", "manager") as RequestHandler,
  sale.home as RequestHandler,
);
router.post(
  salePath,
  hasRole("admin", "manager", "employee") as RequestHandler,
  validation.checkSchema(saleValid.schema),
  sale.create as RequestHandler,
);
router.get(
  `${salePath}/:id`,
  hasRole("admin", "manager") as RequestHandler,
  sale.edit as RequestHandler,
);
router.patch(
  `${salePath}/:id`,
  hasRole("admin", "manager") as RequestHandler,
  sale.update as RequestHandler,
);
router.delete(
  `${salePath}/:id`,
  hasRole("admin", "manager", "employee") as RequestHandler,
  sale.destroy as RequestHandler,
);

/** Purchase endpoints */
const purchasePath = "/purchases";
router.get(
  purchasePath,
  hasRole("admin", "manager") as RequestHandler,
  purchase.home as RequestHandler,
);
router.post(
  purchasePath,
  hasRole("admin", "manager") as RequestHandler,
  validation.checkSchema(purchaseValid.schema),
  purchase.create as RequestHandler,
);
router.get(
  `${purchasePath}/:id`,
  hasRole("admin", "manager") as RequestHandler,
  purchase.edit as RequestHandler,
);
router.patch(
  `${purchasePath}/:id`,
  hasRole("admin", "manager") as RequestHandler,
  purchase.update as RequestHandler,
);
router.delete(
  `${purchasePath}/:id`,
  hasRole("admin", "manager") as RequestHandler,
  purchase.destroy as RequestHandler,
);

/** Upload files */
router.use(imageRouter);

router.use(profile);

router.use(analyticRouter);

export default router;
