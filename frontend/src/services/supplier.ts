import { StockdashResponse } from "@/types/responseObject";
import { stockdashInstance } from "./stockdashService";

interface Supplier {
  name: string;
  contact: {
    email: string;
    phoneNumber: number;
  };
  phoneNumber: number;
}

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
