import { z } from "zod";
import { formatMsg, VALID_MSG } from "@enums";
import { transformRefList, validateRefInDB, validateEmptyArray } from "@utils";

const priceSchema = z.object(
  {
    sale: z.number({
      required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "sale price"),
      invalid_type_error: formatMsg(VALID_MSG.INVALID_NUMBER, "sale price"),
    }),
    purchase: z.number({
      required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "purchase price"),
      invalid_type_error: formatMsg(VALID_MSG.INVALID_NUMBER, "purchase price"),
    }),
  },
  { required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "price object") },
);

export const schema = z.object({
  name: z
    .string({
      required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "name"),
      invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "name"),
    })
    .min(1, formatMsg(VALID_MSG.EMPTY_STRING, "name")),
  categories: z
    .array(
      z.string({
        invalid_type_error: formatMsg(
          VALID_MSG.INVALID_STRING,
          "category item",
        ),
      }),
      {
        invalid_type_error: formatMsg(VALID_MSG.INVALID_ARRAY, "category"),
      },
    )
    .transform(transformRefList("category"))
    .refine(validateRefInDB("categories"), {
      message: formatMsg(VALID_MSG.INVALID_DB_REF, "list of categories"),
    })
    .nullable()
    .optional(),
  price: priceSchema,
  description: z
    .string({
      invalid_type_error: formatMsg(VALID_MSG.INVALID_STRING, "description"),
    })
    .nullable()
    .optional(),
  quantity: z
    .number({
      invalid_type_error: formatMsg(VALID_MSG.INVALID_NUMBER, "quantity"),
    })
    .nullable()
    .optional()
    .default(0),
  suppliers: z
    .array(
      z.string({
        invalid_type_error: formatMsg(
          VALID_MSG.INVALID_STRING,
          "supplier item",
        ),
      }),
      {
        invalid_type_error: formatMsg(VALID_MSG.INVALID_ARRAY, "supplier"),
        required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "supplier list"),
      },
    )
    .refine(validateEmptyArray, {
      message: formatMsg(VALID_MSG.REQUIRED_FIELD, "supplier list"),
    })
    .transform(transformRefList("supplier"))
    .refine(validateRefInDB("suppliers"), {
      message: formatMsg(VALID_MSG.INVALID_DB_REF, "list of suppliers"),
    }),
  images: z.array(z.string()).nullable().optional(),
  status: z.boolean({
    required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "status"),
  }),
});
