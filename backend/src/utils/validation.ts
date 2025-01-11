import { z, RefinementCtx } from "zod";
import { Types } from "mongoose";
import { db } from "@/utils";
import { formatMsg, VALID_MSG } from "@/enums";

/**
 * Transform each id reference into valid objectId
 * */
const transformRefList =
  (field: string) => (ref: string | string[], ctx: RefinementCtx) => {
    const castedRef = db.castStrToObjectId(ref);
    console.log({ castedRef });
    if (!castedRef) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: formatMsg(VALID_MSG.INVALID_OBJ_ID, field),
      });

      return z.NEVER;
    }
    return castedRef;
  };

/**
 * Validate if each id ref exists on the database
 * */
const validateRefInDB =
  (dbCollection: string) => async (ref: Types.ObjectId | Types.ObjectId[]) => {
    try {
      const items = (await db.getDocsById(dbCollection, ref)) ?? [];
      const refItems = Array.isArray(ref) ? ref : [ref];
      return items.length === refItems.length;
    } catch (_) {
      return false;
    }
  };

/**
 *  Check if the array is not empty
 * */
function validateEmptyArray(items: string[]) {
  return items.length > 0;
}

export { transformRefList, validateRefInDB, validateEmptyArray };
