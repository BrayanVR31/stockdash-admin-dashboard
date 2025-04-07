import { z } from "zod";

const imageSchema = z.instanceof(File, {
  message: "El archivo debe ser una imagen.",
});

export { imageSchema };
