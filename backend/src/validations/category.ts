import { z } from "zod";
import { formatMsg, VALID_MSG } from "@/enums";

export const schema = z.object({
  name: z
    .string({
      required_error: formatMsg(VALID_MSG.REQUIRED_FIELD, "name"),
    })
    .min(1, formatMsg(VALID_MSG.EMPTY_STRING, "name"))
    .trim()
    .toLowerCase(),
});
