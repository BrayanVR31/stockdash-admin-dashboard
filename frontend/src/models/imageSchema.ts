import { z } from "zod";

export const imageSchema = z.object({
  path: z.string().min(1),
  extension: z.string().min(1),
  size: z.number(),
  refId: z.string().min(1),
});

export type ImageInput = z.infer<typeof imageSchema>;
