export enum HTTP_STATUS_TYPES {
  "OK" = "OK",
  "TOKEN_EXPIRATION" = "TOKEN_EXPIRATION",
  "INVALID_TOKEN_SIGNATURE" = "INVALID_TOKEN_SIGNATURE",
  "REQUIRED_TOKEN" = "REQUIRED_TOKEN",
  "EXPIRED_SESSION" = "EXPIRED_SESSION",
  "INTERNAL_SERVER_ERROR" = "INTERNAL_SERVER_ERROR",
  "EXISTING_LOG_OUT" = "EXISTING_LOG_OUT",
  "ERROR_REMOVING_FILE" = "ERROR_REMOVING_FILE",
  "FILE_NOT_FOUND" = "FILE_NOT_FOUND",
  "CAST_OBJECT_ID_ERROR" = "CAST_OBJECT_ID_ERROR",
  "REQUIRED_FILE" = "REQUIRED_FILE",
  "FAILED_UPLOAD" = "FAILED_UPLOAD",
  "FAILED_UPLOAD_DELETION" = "FAILED_UPLOAD_DELETION",
  "ROL_FORBIDDEN" = "ROL_FORBIDDEN",
}

export enum HTTP_STATUS_CODES {
  "OK" = 200,
  "TOKEN_EXPIRATION" = 401,
  "INVALID_TOKEN_SIGNATURE" = 401,
  "REQUIRED_TOKEN" = 401,
  "EXPIRED_SESSION" = 401,
  "INTERNAL_SERVER_ERROR" = 500,
  "EXISTING_LOG_OUT" = 400,
  "ERROR_REMOVING_FILE" = 400,
  "FILE_NOT_FOUND" = 404,
  "CAST_OBJECT_ID_ERROR" = 500,
  "REQUIRED_FILE" = 400,
  "FAILED_UPLOAD" = 500,
  "FAILED_UPLOAD_DELETION" = 500,
  "ROL_FORBIDDEN" = 403,
}

export enum HTTP_STATUS_DETAILS {
  "OK" = "",
  "INTERNAL_SERVER_ERROR" = "Sorry, something went wrong, please try again later.",
  "TOKEN_EXPIRATION" = "The token expiration rate has reached a limit. Please update your user credentials.",
  "INVALID_TOKEN_SIGNATURE" = "There are errors in the formatting or in the information contained in the token signature.",
  "REQUIRED_TOKEN" = "The refresh token is required in order to gain access to this resource.",
  "EXPIRED_SESSION" = "Please log in again because your session has expired.",
  "EXISTING_LOG_OUT" = "You are already logged out. No further action is necessary.",
  "ERROR_REMOVING_FILE" = "An error occurred while deleting the file or the file could not be found.",
  "FILE_NOT_FOUND" = "The specified file cannot be found by the system.",
  "CAST_OBJECT_ID_ERROR" = "An error occurred during the casting of the value from objectId.",
  "REQUIRED_FILE" = "No file uploaded. Please attach a file and try again.",
  "FAILED_UPLOAD" = "File upload failed. Please try again later.",
  "FAILED_UPLOAD_DELETION" = "File upload failed and cleanup could not be completed.",
  "ROL_FORBIDDEN" = "Access denied: insufficient permissions.",
}

interface ErrorResponse {
  error: {
    status: HTTP_STATUS_CODES;
    type: HTTP_STATUS_TYPES;
    message: string;
  };
}

export const getServerError = (
  type: HTTP_STATUS_TYPES,
): [number, ErrorResponse] => {
  const status = HTTP_STATUS_CODES[type];
  const response = {
    error: {
      status,
      type,
      message: HTTP_STATUS_DETAILS[type],
    },
  };
  return [status, response];
};
