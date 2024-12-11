export enum HTTP_STATUS_TYPES {
  "OK" = "The resource(s) has been found in a successful way.",
  "CREATED" = "The resource(s) was created without problems.",
  "NOT_FOUND" = "The resource(s) doesn't exist, or it's impossible to find out.",
  "SERVER_ERROR" = "The server gets an undesired problem.",
  "BAD_REQUEST" = "The server won't be able to continue because of malformed or invalid client request.",
  "UNAUTHORIZED" = "Access is denied, the current user credentials are invalid, or the client isn't allowed access.",
  "FORBIDDEN" = "The server blocked the current request because of a lack of permission or the current resource isn't allowed to see.",
}

export enum HTTP_STATUS_CODES {
  "OK" = 200,
  "CREATED" = 201,
  "NO_CONTENT" = 204,
  "BAD_REQUEST" = 400,
  "UNAUTHORIZED" = 401,
  "FORBIDDEN" = 403,
  "NOT_FOUND" = 404,
  "SERVER_ERROR" = 500,
}
