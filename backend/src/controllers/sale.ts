import { Sale } from "@/models";
import { Controller } from "@/types";
import { HTTP_STATUS_TYPES, getServerError } from "@/utils/statusCodes";
import { handleServerError } from "@/utils/error";
import { paginateDocs } from "@/utils";

// Get all resources
export const home: Controller = async (request, response, next) => {
  try {
    // Pagination configuration
    const total = await Sale.countDocuments();
    const { per_page, page } = request.query;
    const { skipDocument, perPage } = paginateDocs(total, per_page, page);
    const results = await Sale.find()
      .skip(skipDocument)
      .limit(perPage)
      .populate({
        path: "products",
      })
      .populate({
        path: "user",
      });
    return response.status(200).json({
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
    const result = await Sale.create(request.body);
    return response.status(201).json(result);
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

// Edit a specific resource
export const edit: Controller = async (request, response, next) => {
  try {
    const result = await Sale.findById(request.params.id);
    if (!result) {
      const [status, serverError] = getServerError(HTTP_STATUS_TYPES.NOT_FOUND);
      return response.status(status).json(serverError);
    }
    return response.status(200).json(result);
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

// Update a specific resource
export const update: Controller = async (request, response, next) => {
  try {
    const { id } = request.params;
    const result = await Sale.findByIdAndUpdate(id, request.body, {
      returnDocument: "after",
    });
    if (!result) {
      const [status, serverError] = getServerError(HTTP_STATUS_TYPES.NOT_FOUND);
      return response.status(status).json(serverError);
    }
    return response.status(200).json(result);
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};

// Delete a specific resource
export const destroy: Controller = async (request, response, next) => {
  try {
    const isDeleted = await Sale.findByIdAndDelete(request.params.id);
    if (!isDeleted) {
      const [status, serverError] = getServerError(HTTP_STATUS_TYPES.NOT_FOUND);
      return response.status(status).json(serverError);
    }
    return response.status(204).end();
  } catch (error) {
    const [status, serverError] = handleServerError(error);
    return response.status(status).json(serverError);
  }
};
