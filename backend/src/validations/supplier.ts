import { z } from "zod";

const addressSchema = z.object({
  street: z
    .string({
      invalid_type_error: "The street must be a text",
    })
    .nullable(),
  state: z
    .string({ invalid_type_error: "The state must be a text" })
    .nullable(),
  zipCode: z
    .number({ invalid_type_error: "The zip code must be a number" })
    .nullable(),
  neighborhood: z
    .string({ invalid_type_error: "The neighborhood must be a text" })
    .nullable(),
});

const contactSchema = z.object({
  email: z
    .string({ invalid_type_error: "Email must be a text" })
    .email("Email must be have email format")
    .nullable(),
  phoneNumber: z
    .string({ invalid_type_error: "The phone number must be a text" })
    .nullable(),
});

const socialMediaSchema = z.object({
  facebook: z
    .string({ invalid_type_error: "The url of facebook must be a string" })
    .url("The url of social media is not valid")
    .optional()
    .nullable(),
  twitter: z
    .string({ invalid_type_error: "The url of twitter must be a string" })
    .url("The url of social media is not valid")
    .optional()
    .nullable(),
  tiktok: z
    .string({ invalid_type_error: "The url of tiktok must be a string" })
    .url("The url of social media is not valid")
    .optional()
    .nullable(),
});

export const schema = z.object({
  name: z
    .string({
      required_error: "The name is a required field",
    })
    .min(1, "The name field must be at least 1 character"),
  address: addressSchema.nullable().optional(),
  contact: contactSchema.nullable().optional(),
  socialMedia: socialMediaSchema.nullable().optional().nullable(),
  image: z.string().nullable().optional(),
});
