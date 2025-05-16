import { z } from "zod";

const saleDateSchema = z.discriminatedUnion("hasSaleDate", [
  z.object({ hasSaleDate: z.literal(false) }),
  z.object({
    hasSaleDate: z.literal(true),
    saleDate: z.date({
      invalid_type_error: "El campo debe tener un formato de fecha.",
    }),
  }),
]);

export const saleSchema = z
  .object({
    products: z
      .array(z.string())
      .min(1, "Debes seleccionar al menos 1 elemento."),
    user: z.array(z.string()).min(1, "Debes seleccionar al menos 1 elemento."),
    totalAmount: z
      .number({
        invalid_type_error: "La cantidad total es un campo requerido",
      })
      .positive("El valor debe ser un número positivo."),
    status: z.enum(["completed", "pending", "canceled"]),
  })
  .and(saleDateSchema);

export type SaleInputs = z.infer<typeof saleSchema>;

export const defaultSale: SaleInputs = {
  user: [],
  totalAmount: 0,
  hasSaleDate: false,
  products: [],
  status: "pending",
};
