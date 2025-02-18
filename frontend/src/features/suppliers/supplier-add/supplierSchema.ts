import { z } from "zod";

const addressSchema = z.object({
  street: z.string(),
  state: z.string(),
  zipCode: z.preprocess((zipCode, ctx) => {
    const parsedZipCode = parseInt(zipCode as string);
    if (Number.isNaN(parsedZipCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El código postal debe ser un número",
      });
      return z.NEVER;
    }
    return parsedZipCode;
  }, z.number().positive("El código postal debe ser un número positivo")),
  neighborhood: z.string(),
});

const contactSchema = z.object({
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
});

const socialMedia = z.object({
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  twitter: z.string().optional(),
});

export const supplierSchema = z.object({
  name: z.string().min(1, "El nombre debe contener al menos un carácter."),
  address: addressSchema.optional(),
  contact: contactSchema.optional(),
  socialMedia: socialMedia.optional(),
  image: z.string().optional(),
});

export type SupplierCreate = z.infer<typeof supplierSchema>;
