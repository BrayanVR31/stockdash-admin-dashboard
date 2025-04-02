import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo electrónico es obligatorio." })
    .email({ message: "El correo electrónico es inválido." }),
  password: z
    .string({ required_error: "La contraseña es requerida." })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
});

export type UserInputs = z.infer<typeof userSchema>;
