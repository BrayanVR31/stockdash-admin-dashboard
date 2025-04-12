import { z } from "zod";
import { addressSchema } from "@/validations/address";

const contactSchema = z.object({
  email: z
    .string({ invalid_type_error: "Email must be a text" })
    .email("Email must be have email format")
    .nullable(),
  phoneNumber: z
    .string({ invalid_type_error: "The phone number must be a text" })
    .nullable(),
});

const linkSchema = z.object({
  url: z.string().url("The url link must be a web address"),
});

export const schema = z.object({
  name: z
    .string({
      required_error: "The name is a required field",
    })
    .min(1, "The name field must be at least 1 character"),
  address: addressSchema.nullable().optional(),
  contact: contactSchema.nullable().optional(),
  socialMedia: z.array(linkSchema).optional().nullable().default(null),
  image: z.string().nullable().optional(),
});

// Schema for bulk delete operation
export const bulkDeleteSchema = z.object({
  ids: z
    .array(
      z.string({
        required_error: "Each ID must be a string",
        invalid_type_error: "Each ID must be a string",
      }),
    )
    .min(1, "At least one ID is required"),
});
