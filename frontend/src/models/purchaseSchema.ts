import { z } from "zod";

const purchaseDateSchema = z.discriminatedUnion("hasPurchaseDate", [
  z.object({ hasPurchaseDate: z.literal(false) }),
  z.object({ hasPurchaseDate: z.literal(true), purchaseDate: z.date() }),
]);

const ticketImageSchema = z.discriminatedUnion("hasTicketImage", [
  z.object({ hasTicketImage: z.literal(false) }),
  z.object({
    hasTicketImage: z.literal(true),
    ticketImages: z.array(z.string()),
  }),
]);

export const purchaseSchema = z
  .object({
    name: z.string().min(1, "Este campo es obligatorio."),
    totalPrice: z.number().positive("El valor debe ser un número positivo."),
    totalQuantity: z.number().positive("El valor debe ser un número positivo."),
    supplier: z.string().min(1, "Este campo es obligatorio."),
    products: z.array(z.string()),
  })
  .and(purchaseDateSchema)
  .and(ticketImageSchema);

export type PurchaseInputs = z.infer<typeof purchaseSchema>;

export const defaultPurchase: PurchaseInputs = {
  name: "",
  totalPrice: 0,
  totalQuantity: 0,
  supplier: "",
  hasPurchaseDate: false,
  hasTicketImage: false,
  products: [],
};
