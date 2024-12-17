import axios from "axios";
import { SupplierInput, SupplierResponse } from "../types";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

// Types
interface PaginationParams {
  page: number;
  perPage: number;
}

// Get all suppliers data
export async function getSuppliers({ page, perPage }: PaginationParams) {
  const response = await instance.get<SupplierResponse>(
    `/suppliers/?page=${page}&per_page=${perPage}`,
  );
  console.log(response);
  return response.data;
}

// Save supplier information
export async function createSupplier(data: SupplierInput) {
  const response = await instance.post("/suppliers", data);
  return response;
}
