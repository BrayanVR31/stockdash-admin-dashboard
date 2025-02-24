import { z } from "zod";

const imageSchema = z.object(
  {
    image: z.any().superRefine((file, ctx) => {
      console.log("zoddddd file!!", file);
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
      });
    }),
  },
  {
    invalid_type_error: "The image input must be a file.",
    required_error: "The image input is required.",
  },
);

export type Image = z.infer<typeof imageSchema>;
export { imageSchema };
