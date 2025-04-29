import { z } from "zod";

const saleDateSchema = z.discriminatedUnion("hasSaleDate", [
  z.object({ hasSaleDate: z.literal(false) }),
  z.object({ hasSaleDate: z.literal(true), saleDate: z.date() }),
]);

export const saleSchema = z
  .object({
    products: z.array(z.string()),
    user: z.string().min(1),
    totalAmount: z.number().positive("El valor debe ser un número positivo."),
    status: z.enum(["completed", "pending", "canceled"]),
  })
  .and(saleDateSchema);

export type SaleInputs = z.infer<typeof saleSchema>;

export const defaultSale: SaleInputs = {
  user: "",
  totalAmount: 0,
  hasSaleDate: false,
  products: [],
  status: "pending",
};
