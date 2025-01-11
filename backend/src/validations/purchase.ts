import { z } from "zod";
import { formatMsg, VALID_MSG } from "@/enums";
import { validateRefInDB, transformRefList } from "@/utils";

const schema = z.object({
  name: z.string({
    required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "name"),
    invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "name"),
  }),
  totalPrice: z.string({
    required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "total price"),
    invalid_type_error: formatMsg(VALID_MSG.INVALID_NUMBER, "total price"),
  }),
  totalQuantity: z.string({
    required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "total quantity"),
    invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "total quantity"),
  }),
  supplier: z
    .string({
      required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "supplier field"),
      invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "supplier field"),
    })
    .transform(transformRefList("supplier"))
    .refine(validateRefInDB("suppliers"), {
      message: formatMsg(VALID_MSG.INVALID_DB_REF, "supplier"),
    }),
  purchaseDate: z
    .string({
      invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "purchase date"),
    })
    .date(formatMsg(VALID_MSG.INVALID_DATE, "purchase date"))
    .nullable()
    .default(null),
  products: z
    .array(
      z.string({
        invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "product item"),
        required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "product item"),
      }),
      {
        invalid_type_error: formatMsg(VALID_MSG.INVALID_ARRAY, "product list"),
        required_error: formatMsg(VALID_MSG.REQUIRED_ARRAY, "product list"),
      },
    )
    .transform(transformRefList("products"))
    .refine(validateRefInDB("products"), {
      message: formatMsg(VALID_MSG.INVALID_DB_REF, "list of products"),
    }),
  ticketImages: z.array(z.string()).nullable().default(null),
});

export { schema };
