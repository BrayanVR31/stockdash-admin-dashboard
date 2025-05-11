import { z } from "zod";
import { addressSchema } from "@/validations/address";

export const userSchema = z.object({
  email: z
    .string({
      required_error: "The email is required.",
    })
    .email("The email must have a valid format."),
  password: z
    .string({
      required_error: "The password is required.",
    })
    .min(8, "The password must have at least 8 characters."),
  username: z
    .string()
    .min(1, "The username must not be empty.")
    .optional()
    .nullable(),
  profile: z
    .object({
      name: z.string().min(1, "The name is required."),
      lastName: z.string().min(1, "The last name is required."),
      avatar: z.string().optional().nullable(),
      phoneNumber: z.string().optional().nullable(),
      address: addressSchema.optional(),
    })
    .optional()
    .nullable(),
  rol: z.string({
    required_error: "The role is required.",
  }),
});

export const partialUserSchema = userSchema.partial();

export type UserInput = z.infer<typeof userSchema>;
