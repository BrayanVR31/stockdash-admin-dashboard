import { z } from "zod";

const descriptionSchema = z.discriminatedUnion("hasDescription", [
  z.object({ hasDescription: z.literal(false) }),
  z.object({
    hasDescription: z.literal(true),
    description: z
      .string()
      .min(1, "El texto es muy corto. Se require mínimo 1 carácter.")
      .max(50, "El texto es demasiado largo. Máximo permitido: 50 caracteres."),
  }),
]);

const priceSchema = z.object({
  price: z.object({
    purchase: z
      .number({
        invalid_type_error: "El valor debe ser númerico.",
      })
      .positive("El valor debe ser un número positivo."),
    sale: z
      .number({
        invalid_type_error: "El valor debe ser númerico.",
      })
      .positive("El valor debe ser un número positivo."),
  }),
});

export const productSchema = z
  .object({
    name: z.string().min(1, "Este campo es obligatorio."),
    quantity: z
      .number({
        invalid_type_error: "El valor debe ser númerico.",
      })
      .positive("El valor debe ser un número positivo."),
    categories: z
      .array(z.string())
      .min(1, "Debes seleccionar al menos 1 elemento."),
    suppliers: z
      .array(z.string())
      .min(1, "Debes seleccionar al menos 1 elemento."),
    status: z.boolean(),
    images: z.array(z.string()).nullable(),
  })
  .and(priceSchema)
  .and(descriptionSchema);

export type ProductInputs = z.infer<typeof productSchema>;

export const defaultProduct: ProductInputs = {
  name: "",
  hasDescription: false,
  status: false,
  quantity: 0,
  suppliers: [],
  categories: [],
  price: {
    sale: 0,
    purchase: 0,
  },
  images: null,
};
