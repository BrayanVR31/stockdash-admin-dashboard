import { z } from "zod";
import bcrypt from "bcryptjs";
import { User } from "@/models/user";

const authSchema = z
  .object({
    email: z
      .string({
        message: "The email is a required field",
      })
      .nonempty("The email can't be an empty string")
      .email({ message: "The email has not a valid format" }),
    password: z
      .string({
        message: "The password is a required field",
      })
      .min(8, { message: "The password must be have at least 8 characters" }),
  })
  .superRefine(async ({ email, password }, ctx) => {
    if (!email || !password) {
      return z.NEVER;
    }

    // Verify the existing user on database
    const user = await User.findOne({ email });
    if (!user) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The email is not registered on the system(invalid email).",
        path: ["email"],
      });
      return z.NEVER;
    }

    // Verify the hashed password with input password
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The password is wrong(invalid password).",
        path: ["password"],
      });
      return z.NEVER;
    }
  });

type Auth = z.infer<typeof authSchema>;

export { authSchema };
export type { Auth };
