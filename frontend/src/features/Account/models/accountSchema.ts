import { z } from "zod";

const addressSchema = z.discriminatedUnion("hasAddress", [
  z.object({ hasAddress: z.literal(false) }),
  z.object({
    hasAddress: z.literal(true),
    address: z.object({
      street: z
        .string()
        .min(1, "El campo calle debe contener al menos 1 carácter."),
      country: z
        .string()
        .min(1, "El campo país debe contener al menos 1 carácter."),
      state: z
        .string()
        .min(1, "El campo estado debe contener al menos 1 carácter."),
      city: z
        .string()
        .min(1, "El campo ciudad debe contener al menos 1 carácter."),
      zipCode: z
        .string()
        .regex(/^[0-9]{5}$/g, "El código postal debe tener 5 dígitos."),
    }),
  }),
]);

const contactSchema = z.discriminatedUnion("hasContact", [
  z.object({ hasContact: z.literal(false) }),
  z.object({
    hasContact: z.literal(true),
    phoneNumber: z
      .string()
      .regex(/^$|^\d+$/g, "El número de teléfono solo debe contener dígitos.")
      .min(10, "El número de teléfono debe contener como máximo 10 dígitos.")
      .max(10, "El número de teléfono debe contener como máximo 10 dígitos.")
      .transform((phoneNumber) => (!phoneNumber ? null : phoneNumber)),
  }),
]);

const profileSchema = z
  .object({
    name: z.string().min(1, "Este campo no puede estar vacío."),
    lastName: z.string().min(1, "Este campo no puede estar vacío."),
    username: z.string().nullable(),
    avatar: z.string().nullable(),
  })
  .and(contactSchema)
  .and(addressSchema);

export const accountSchema = z.object({
  profile: profileSchema,
});

export type AccountInputs = z.infer<typeof accountSchema>;

export const defaultAccount: AccountInputs = {
  profile: {
    hasAddress: false,
    hasContact: false,
    username: "",
    avatar: null,
    lastName: "",
    name: "",
  },
};
