import { axiosInstance } from "./axios";
import { SupplierList } from "@/models";

// Get all supplier list items
export const getSuppliers = async () => {
  const response = await axiosInstance.get<SupplierList>("/suppliers");
  return response.data;
};
