import { Router, RequestHandler } from "express";
import { category, supplier, product, sale, purchase } from "@controllers";

const router = Router();

/** Category endpoints */
const categoryPath = "/categories";
router.get(categoryPath, category.home as RequestHandler);
router.post(categoryPath, category.create as RequestHandler);
router.get(`${categoryPath}/:id`, category.edit as RequestHandler);
router.put(`${categoryPath}/:id`, category.update as RequestHandler);
router.delete(`${categoryPath}/:id`, category.destroy as RequestHandler);

/** Supplier endpoints */
const supplierPath = "/suppliers";
router.get(supplierPath, supplier.home as RequestHandler);
router.post(supplierPath, supplier.create as RequestHandler);
router.get(`${supplierPath}/:id`, supplier.edit as RequestHandler);
router.patch(`${supplierPath}/:id`, supplier.update as RequestHandler);
router.delete(`${supplierPath}/:id`, supplier.destroy as RequestHandler);

/** Product endpoints */
const productPath = "/products";
router.get(productPath, product.home as RequestHandler);
router.post(productPath, product.create as RequestHandler);
router.get(`${productPath}/:id`, product.edit as RequestHandler);
router.patch(`${productPath}/:id`, product.update as RequestHandler);
router.delete(`${productPath}/:id`, product.destroy as RequestHandler);

/** Sale endpoints */
const salePath = "/sales";
router.get(salePath, sale.home as RequestHandler);
router.post(salePath, sale.create as RequestHandler);
router.get(`${salePath}/:id`, sale.edit as RequestHandler);
router.patch(`${salePath}/:id`, sale.update as RequestHandler);
router.delete(`${salePath}/:id`, sale.destroy as RequestHandler);

/** Purchase endpoints */
const purchasePath = "/purchases";
router.get(purchasePath, purchase.home as RequestHandler);
router.post(purchasePath, purchase.create as RequestHandler);
router.get(`${purchasePath}/:id`, purchase.edit as RequestHandler);
router.patch(`${purchasePath}/:id`, purchase.update as RequestHandler);
router.delete(`${purchasePath}/:id`, purchase.destroy as RequestHandler);

export default router;
