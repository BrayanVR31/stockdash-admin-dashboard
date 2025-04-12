import { z } from "zod";
import { imageSchema } from "@/schemas/image";

const addressSchema = z.discriminatedUnion("hasAddress", [
  z.object({ hasAddress: z.literal(false) }),
  z.object({
    hasAddress: z.literal(true),
    address: z.object({
      street: z
        .string()
        .min(1, "El campo estado debe contener al menos 1 carácter."),
      state: z
        .string()
        .min(1, "El campo estado debe contener al menos 1 carácter."),
      neighborhood: z
        .string()
        .min(1, "El campo estado debe contener al menos 1 carácter."),
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
    contact: z.object({
      phoneNumber: z
        .string()
        .regex(/^$|^\d+$/g, "El número de teléfono solo debe contener dígitos.")
        .min(0)
        .max(10, "El número de teléfono debe contener como máximo 10 dígitos.")
        .nullable()
        .transform((phoneNumber) => (!phoneNumber ? null : phoneNumber)),
      email: z
        .string()
        .regex(
          /^$|^[\w|\.]+@(gmail|outlook|yahoo|hotmail|tiamshi)\.(com)$/g,
          "El email debe tener un formato válido.",
        )
        .nullable()
        .transform((email) => (!email ? null : email)),
    }),
  }),
]);

const socialMediaSchema = z.discriminatedUnion("hasSocialMedia", [
  z.object({
    hasSocialMedia: z.literal(false),
  }),
  z.object({
    hasSocialMedia: z.literal(true),
    socialMedia: z.array(
      z.object({
        url: z.string().url("La url ingresada es incorrecta."),
      }),
    ),
  }),
]);

export const supplierSchema = z
  .object({
    name: z.string().min(1, "El nombre debe contener al menos un carácter."),
    image: z.string().nullable(),
  })
  .and(socialMediaSchema)
  .and(addressSchema)
  .and(contactSchema);

export const defaultSupplier: SupplierCreate = {
  name: "",
  image: null,
  hasSocialMedia: false,
  hasAddress: false,
  hasContact: false,
};

export type SupplierCreate = z.infer<typeof supplierSchema>;
export type SupplierAddress = z.infer<typeof addressSchema>;
export type SupplierContact = z.infer<typeof contactSchema>;
export type SupplierSocialMedia = z.infer<typeof socialMediaSchema>;
