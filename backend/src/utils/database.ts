import { Types, isValidObjectId } from "mongoose";
import { database as db } from "@/config";

/**
 *  Retrives an array of documents through reference's ObjectId (single or multiple)
 * */
async function getDocsById(
  collectionRef: string,
  idRef: Types.ObjectId | Types.ObjectId[],
) {
  try {
    const dbConn = await db.initDBConnection();
    const stablishedConn = dbConn?.connection ?? null;
    if (!stablishedConn)
      throw Error(
        "The database can't get connect and it founds an error connection",
      );

    const collection = stablishedConn.collection(collectionRef);
    if (!collection)
      throw Error(
        `The collection ${collectionRef} doesn't exist in current database`,
      );
    const idList = Array.isArray(idRef) ? idRef : [idRef];
    const docs = collection.find({
      _id: {
        $in: idList,
      },
    });
    return docs ? await docs.toArray() : null;
  } catch (error) {}
}

/**
 *  Cast a single string or array of string into ObjectId format
 * */
function castStrToObjectId(items: string | string[]) {
  if (Array.isArray(items)) {
    const hasObjIdArray = Boolean(
      items.reduce(
        (prev, current) => +isValidObjectId(prev) * +isValidObjectId(current),
        1,
      ),
    );
    return hasObjIdArray ? items.map((item) => new Types.ObjectId(item)) : null;
  }

  return isValidObjectId(items) ? new Types.ObjectId(items) : null;
}

export { getDocsById, castStrToObjectId };
