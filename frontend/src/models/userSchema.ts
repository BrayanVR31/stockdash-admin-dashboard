import { z } from "zod";

const usernameSchema = z.discriminatedUnion("hasUsername", [
  z.object({ hasUsername: z.literal(false) }),
  z.object({ hasUsername: z.literal(true), username: z.string().min(1) }),
]);

const addressSchema = z.discriminatedUnion("hasAddress", [
  z.object({ hasAddress: z.literal(false) }),
  z.object({
    hasAddress: z.literal(true),
    address: z.object({
      street: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      zipCode: z.number().min(5).max(5),
      country: z.string().min(1),
    }),
  }),
]);

const imageSchema = z.object({
  path: z.string().min(1),
  extension: z.string().min(1),
  size: z.number(),
  refId: z.string().min(1),
});

const avatarSchema = z.discriminatedUnion("hasAvatar", [
  z.object({
    hasAvatar: z.literal(false),
  }),
  z.object({
    hasAvatar: z.literal(true),
    avatar: imageSchema,
  }),
]);

const profileSchema = z.discriminatedUnion("hasProfile", [
  z.object({ hasProfile: z.literal(false) }),
  z.object({
    hasProfile: z.literal(true),
    profile: z
      .object({
        name: z.string().min(1, { message: "Este campo es obligatorio." }),
        lastName: z.string().min(1, { message: "Este campo es obligatorio." }),
        phoneNumber: z
          .string()
          .regex(/^[0-9]+$/, {
            message: "El número de teléfono debe tener dígitos.",
          })
          .min(10, {
            message: "El número de teléfono tener 10 dígitos.",
          })
          .max(10, {
            message: "El número de teléfono tener 10 dígitos.",
          }),
      })
      .and(addressSchema)
      .and(avatarSchema),
  }),
]);

export const userSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Este campo es obligatorio." })
      .email("El correo electrónico no es válido"),
    password: z.string().min(8, {
      message: "La contraseña debe contener al menos 8 caracteres.",
    }),
    rol: z.string().min(1).max(1),
    status: z.boolean(),
  })
  .and(usernameSchema)
  .and(profileSchema);

export type UserInputs = z.infer<typeof userSchema>;

export const defaultUser: UserInputs = {
  email: "",
  password: "",
  rol: "",
  status: false,
  hasProfile: false,
  hasUsername: false,
};
