import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email({ message: "El correo electrónico es inválido." }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
});

export type UserInputs = z.infer<typeof userSchema>;
