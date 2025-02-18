import { axiosInstance } from "./axios";
import { SupplierList } from "@/models";
import { RequestParams } from "@/models/request-model";

// Get all supplier list items
export const getSuppliers = async ({ pagination }: RequestParams) => {
  const query = !pagination
    ? ""
    : `?per_page=${pagination.perPage}&page=${pagination.page}`;
  const response = await axiosInstance.get<SupplierList>(`/suppliers${query}`);
  return response.data;
};
