import { Product, IProduct } from "@/models";
import { Controller, ServerError, JSONResponse } from "@/types";
import { HTTP_STATUS_TYPES, HTTP_STATUS_CODES } from "@/enums";
import { paginateDocs } from "@/utils";

// Types
type ProductController = Controller<JSONResponse<IProduct>>;

// Get all resources
export const home: Controller = async (request, response, next) => {
  try {
    // Pagination configuration
    const total = await Product.countDocuments();
    const { per_page, page, with_pagination = "1" } = request.query;
    if (with_pagination === "0") {
      const data = await Product.find();
      return response.status(HTTP_STATUS_CODES.OK).json(data);
    }
    const { skipDocument, perPage } = paginateDocs(total, per_page, page);
    const results = await Product.find()
      .populate("suppliers")
      .skip(skipDocument)
      .limit(perPage);
    return response.status(HTTP_STATUS_CODES.OK).json({
      results,
      total,
      subtotal: results.length,
      page: per_page && !page ? 1 : +page,
      per_page: perPage,
    });
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Create a new resource
export const create: Controller = async (request, response, next) => {
  try {
    const result = await Product.create(request.body);
    return response.status(HTTP_STATUS_CODES.CREATED).json(result);
  } catch (error) {
    console.log(error);
    const serverError = new Error("") as ServerError;
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Edit a specific resource
export const edit: Controller = async (request, response, next) => {
  const serverError = new Error("") as ServerError;
  try {
    const result = await Product.findById(request.params.id);
    if (!result) {
      // Returns an error when the resource was not found it
      serverError.title = "Document not found it";
      serverError.message = HTTP_STATUS_TYPES.NOT_FOUND;
      serverError.status = HTTP_STATUS_CODES.NOT_FOUND;
      serverError.jsonKey = "error";
      return next(serverError);
    }
    return response.status(HTTP_STATUS_CODES.OK).json(result);
  } catch (error) {
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Update a specific resource
export const update: Controller = async (request, response, next) => {
  const serverError = new Error("") as ServerError;
  try {
    const { id } = request.params;
    const result = await Product.findByIdAndUpdate(id, request.body, {
      returnDocument: "after",
    });
    if (!result) {
      // Error when it's impossible to delete document
      serverError.title = "Error updating document";
      serverError.message = HTTP_STATUS_TYPES.NOT_FOUND;
      serverError.status = HTTP_STATUS_CODES.NOT_FOUND;
      serverError.jsonKey = "error";
      return next(serverError);
    }
    return response.status(HTTP_STATUS_CODES.OK).json(result);
  } catch (error) {
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};

// Delete a specific resource
export const destroy: Controller = async (request, response, next) => {
  const serverError = new Error("") as ServerError;
  try {
    const isDeleted = await Product.findByIdAndDelete(request.params.id);
    if (!isDeleted) {
      // Error when it's impossible to delete document
      serverError.title = "Document deletion error";
      serverError.message = HTTP_STATUS_TYPES.NOT_FOUND;
      serverError.status = HTTP_STATUS_CODES.NOT_FOUND;
      serverError.jsonKey = "error";
      return next(serverError);
    }
    return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
  } catch (error) {
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};
