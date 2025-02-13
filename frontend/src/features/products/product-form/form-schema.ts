import { z } from "zod";

const priceSchema = z.object({
  sale: z.preprocess((sale, ctx) => {
    const parsedSale = parseFloat(sale as string);
    if (Number.isNaN(parsedSale)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El precio de venta es un campo obligatorio",
      });
      return z.NEVER;
    }
    return parsedSale;
  }, z.number().positive("El precio de venta debe ser un número positivo")),
  purchase: z.preprocess((purchase, ctx) => {
    const parsedPurchase = parseFloat(purchase as string);
    if (Number.isNaN(parsedPurchase)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El precio de compra es un campo obligatorio",
      });
      return z.NEVER;
    }
    return parsedPurchase;
  }, z.number().positive("El precio de compra debe ser un número positivo")),
});

const productSchema = z.object({
  name: z
    .string({
      required_error: "error",
    })
    .min(1, "El nombre debe tener al menos un carácter"),
  quantity: z.preprocess((quantity, ctx) => {
    const parsedQuantity = parseFloat(quantity as string);
    if (Number.isNaN(parsedQuantity)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La cantidad debe ser un número válido",
      });
      return z.NEVER;
    }
    return parsedQuantity;
  }, z.number().int("La cantidad debe ser un número entero").nonnegative("La cantidad debe ser un número positivo")),
  description: z.string().optional(),
  status: z.boolean({
    required_error: "Selecciona un status para el producto",
  }),
  categories: z.array(z.string()).optional(),
  suppliers: z
    .array(z.string(), {
      required_error: "El campo proveedor es obligatorio",
    })
    .nonempty("Debes seleccionar al menos un proveedor"),
  price: priceSchema,
  /*
  images: z.array(z.string()).nullable(),

  */
});

const partialProduct = productSchema.deepPartial();

export type ProductForm = z.infer<typeof productSchema>;
export type PartialProduct = z.infer<typeof partialProduct>;

export { productSchema, partialProduct };
