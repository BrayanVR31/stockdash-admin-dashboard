import { PopulateOptions } from "mongoose";
import { Supplier, ISupplier } from "@/models";
import { Controller, ServerError, JSONResponse } from "@/types";
import { HTTP_STATUS_TYPES, HTTP_STATUS_CODES } from "@/enums";
import { paginateDocs } from "@/utils";
import { handleServerError } from "@/utils/error";

//  Types
type SupplierController = Controller<JSONResponse<ISupplier>>;

// Get all resources
export const home: Controller = async (request, response, next) => {
  try {
    // Pagination configuration
    const total = await Supplier.countDocuments();
    const { per_page, page } = request.query;
    const { skipDocument, perPage } = paginateDocs(total, per_page, page);
    const results = await Supplier.find().skip(skipDocument).limit(perPage);
    return response.status(HTTP_STATUS_CODES.OK).json({
      results,
      total,
      subtotal: results.length,
      page: per_page && !page ? 1 : +page,
      per_page: perPage,
    });
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

// Create a new resource
export const create: Controller = async (request, response, next) => {
  try {
    const result = await Supplier.create(request.body);
    return response.status(HTTP_STATUS_CODES.CREATED).json(result);
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

// Edit a specific resource
export const edit: Controller = async (request, response, next) => {
  const serverError = new Error("") as ServerError;
  try {
    const populatedImage: PopulateOptions = {
      path: "image",
      transform: (doc) => {
        doc.path = `public/images/${doc.path}`;
        return doc;
      },
    };
    const result = await Supplier.findById(request.params.id).populate(
      populatedImage
    );
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
    const result = await Supplier.findByIdAndUpdate(id, request.body, {
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
    const isDeleted = await Supplier.findByIdAndDelete(request.params.id);
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

// Bulk delete multiple suppliers
export const bulkDestroy: Controller = async (request, response, next) => {
  const serverError = new Error("") as ServerError;
  try {
    const { ids } = request.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      serverError.title = "Invalid request";
      serverError.message = "IDs array is required and must not be empty";
      serverError.status = HTTP_STATUS_CODES.BAD_REQUEST;
      serverError.jsonKey = "error";
      return next(serverError);
    }

    // Delete all suppliers with the provided IDs
    const result = await Supplier.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      serverError.title = "Document deletion error";
      serverError.message = HTTP_STATUS_TYPES.NOT_FOUND;
      serverError.status = HTTP_STATUS_CODES.NOT_FOUND;
      serverError.jsonKey = "error";
      return next(serverError);
    }

    return response.status(HTTP_STATUS_CODES.OK).json({
      message: `Successfully deleted ${result.deletedCount} suppliers`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    // Default server error
    serverError.title = "Internal server error";
    serverError.message = HTTP_STATUS_TYPES.SERVER_ERROR;
    serverError.status = HTTP_STATUS_CODES.SERVER_ERROR;
    serverError.jsonKey = "error";
    return next(serverError);
  }
};
