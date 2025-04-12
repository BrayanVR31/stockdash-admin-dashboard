import { StockdashResponse } from "@/types/responseObject";
import { stockdashInstance } from "./stockdashService";
import { Supplier } from "@/types/supplier";

interface FetchParams {
  pagination?: {
    perPage: number;
    page: number;
  };
}

// Get all supplier list items
export const getSuppliers = async ({ pagination }: FetchParams) => {
  const query = !pagination
    ? ""
    : `?per_page=${pagination.perPage}&page=${pagination.page}`;
  const response = await stockdashInstance.get<StockdashResponse<Supplier>>(
    `/suppliers${query}`,
  );
  return response.data;
};

export const addSupplier = async <T>(supplier: T) => {
  return (await stockdashInstance.post("/suppliers", supplier)).data;
};

export const deleteSupplier = async (id: string) => {
  return (await stockdashInstance.delete(`/suppliers/${id}`)).data;
};

export const getSupplier = async (id: string) => {
  return (await stockdashInstance.get<Supplier>(`/suppliers/${id}`)).data;
};

export const deleteSuppliers = async (ids: string[]) => {
  return (await stockdashInstance.post(`/suppliers/bulk-delete`, { ids })).data;
};
