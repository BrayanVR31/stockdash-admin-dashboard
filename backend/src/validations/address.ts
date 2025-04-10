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
    .string()
    .transform((value, ctx) => {
      const parsedZipCode = +value;
      if (Number.isNaN(parsedZipCode)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "The zip code is not a number",
        });
        return z.NEVER;
      }
      return parsedZipCode;
    })
    .nullable(),
  neighborhood: z
    .string({ invalid_type_error: "The neighborhood must be a text" })
    .nullable(),
});

export type Address = z.infer<typeof addressSchema>;
export { addressSchema };
