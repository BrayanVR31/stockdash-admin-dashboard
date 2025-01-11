import { z } from "zod";
import { transformRefList, validateRefInDB } from "@/utils";
import { formatMsg, VALID_MSG } from "@/enums";

const schema = z.object({
  products: z
    .array(
      z.string({
        required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "product item"),
        invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "product item"),
      }),
      {
        invalid_type_error: formatMsg(VALID_MSG.INVALID_ARRAY, "product"),
        required_error: formatMsg(VALID_MSG.REQUIRED_ARRAY, "product"),
      },
    )
    .transform(transformRefList("products"))
    .refine(validateRefInDB("products"), {
      message: formatMsg(VALID_MSG.INVALID_DB_REF, "product list"),
    }),
  totalAmount: z.number({
    invalid_type_error: formatMsg(VALID_MSG.INVALID_NUMBER, "total amount"),
    required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "total amount"),
  }),
  saleDate: z
    .string({
      invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "sale date"),
    })
    .date(formatMsg(VALID_MSG.INVALID_DATE, "sale date"))
    .nullable()
    .default(null),
  user: z
    .string({
      invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "user"),
      required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "user"),
    })
    .transform(transformRefList("user"))
    .refine(validateRefInDB("users"), {
      message: formatMsg(VALID_MSG.INVALID_DB_REF, "user"),
    }),
});

export { schema };
