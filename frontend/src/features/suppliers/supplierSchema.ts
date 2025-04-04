import { z } from "zod";

const addressSchema = z.object({
  street: z.string(),
  state: z.string(),
  zipCode: z
    .string()
    .regex(/^$|^[0-9]{5}$/g, "El código postal debe tener 5 dígitos.")
    .nullable()
    .transform((zipCode) => (!zipCode ? null : +zipCode)),
  neighborhood: z.string(),
});

const contactSchema = z.object({
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
      /^$|^[\w|\.]+@(gmail|outlook|yahoo|hotmail)\.(com)$/g,
      "El email debe tener un formato válido.",
    )
    .nullable()
    .transform((email) => (!email ? null : email)),
});

const socialMedia = z.object({
  facebook: z
    .string()
    .regex(/^$|^https:\/\/.+$/g, "La url es inválida.")
    .nullable()
    .transform((url) => (!url ? null : url)),
  tiktok: z
    .string()
    .regex(/^$|^https:\/\/.+$/g, "La url es inválida.")
    .nullable()
    .transform((url) => (!url ? null : url)),
  twitter: z
    .string()
    .regex(/^$|^https:\/\/.+$/g, "La url es inválida.")
    .nullable()
    .transform((url) => (!url ? null : url)),
});

export const supplierSchema = z.object({
  name: z.string().min(1, "El nombre debe contener al menos un carácter."),
  address: addressSchema.optional(),
  contact: contactSchema.default({
    email: null,
    phoneNumber: null,
  }),
  socialMedia: socialMedia.optional().default({
    facebook: null,
    tiktok: null,
    twitter: null,
  }),
  image: z.string().optional(),
});

export type SupplierCreate = z.infer<typeof supplierSchema>;
