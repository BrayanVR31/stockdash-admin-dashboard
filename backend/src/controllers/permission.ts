import { Controller, ServerError } from "@types";
import { HTTP_ERROR_TYPES, HTTP_ERROR_CODES } from "@enums";

// Get all resources
export const home: Controller = async (request, response, next) => {
  try {
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_ERROR_TYPES.SERVER_ERROR;
    serverError.status = HTTP_ERROR_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Create a new resource
export const create: Controller = async (request, response, next) => {
  try {
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_ERROR_TYPES.SERVER_ERROR;
    serverError.status = HTTP_ERROR_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Edit a specific resource
export const edit: Controller = async (request, response, next) => {
  try {
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_ERROR_TYPES.SERVER_ERROR;
    serverError.status = HTTP_ERROR_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Update a specific resource
export const update: Controller = async (request, response, next) => {
  try {
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_ERROR_TYPES.SERVER_ERROR;
    serverError.status = HTTP_ERROR_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Delete a specific resource
export const destroy: Controller = async (request, response, next) => {
  try {
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_ERROR_TYPES.SERVER_ERROR;
    serverError.status = HTTP_ERROR_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};
