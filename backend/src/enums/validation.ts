export enum VALID_MSG {
  REQUIRED_FIELD = "The {{field}} must be a required field",
  REQUIRED_ARRAY = "The {{field}} must be have at least 1 item in the array",
  INVALID_STRING = "The {{field}} hasn't a valid format, it expects text",
  INVALID_NUMBER = "The {{field}} must be a number data type such as integer, decimal, float, etc.",
  INVALID_BOOLEAN = "The {{field}} must be a boolean data type",
  INVALID_ARRAY = "The {{field}}  list must be include a set of elements or array of items",
  INVALID_OBJ_ID = "The {{field}} list or {{field}} item hasn't a valid object id format or it doesn't have a existing document reference",
  INVALID_DB_REF = "The {{field}} doesn't exist in the database",
  INVALID_DATE = "The {{field}} must be have date format (dd/mm/yy)",
  EMPTY_STRING = "The {{field}} can't be an empty string, it must be at least 1 character",
}

// Format text and replace each flag it starts and ends with '{{}}'
export function formatMsg(message: string, fieldName: string) {
  return message.replace(/\{\{.+\}\}/g, fieldName);
}
