import { z } from "zod";
import { addressSchema } from "@/validations/address";
import { formatMsg, VALID_MSG } from "@/enums/validation";
import { isValidObjectId, Types } from "mongoose";

const profileSchema = z.object(
  {
    name: z
      .string({
        required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "name"),
      })
      .min(1, formatMsg(VALID_MSG.EMPTY_STRING, "name")),
    lastName: z
      .string({
        required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "lastName"),
      })
      .min(1, formatMsg(VALID_MSG.EMPTY_STRING, "lastName")),
    avatar: z
      .string()
      .optional()
      .nullable()
      .transform((avatar, ctx) => {
        if (!isValidObjectId(avatar)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "The avatar input must be an existing uploaded image reference.",
          });
          return z.NEVER;
        }
        return new Types.ObjectId(avatar);
      }),
    phoneNumber: z
      .string({
        required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "phoneNumber"),
      })
      .min(10, "The phoneNumber input must contain at least 10 characters.")
      .max(
        10,
        "The phoneNumber input must contain a maximum of 10 characters.",
      ),
    address: addressSchema.optional(),
  },
  {
    invalid_type_error:
      "The profile input is invalid. Please check if the following properties such as the name, lastName, avatar, phoneNumber, address are present.",
  },
);

const accountSchema = z.object({
  email: z.string().email(),
  username: z
    .string({
      invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "username"),
    })
    .min(1, formatMsg(VALID_MSG.EMPTY_STRING, "username")),
  profile: profileSchema.optional(),
});

const deepAccountPartial = accountSchema.deepPartial();

export type Account = z.infer<typeof accountSchema>;
export { accountSchema, deepAccountPartial };
