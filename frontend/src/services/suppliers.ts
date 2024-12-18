import axios from "axios";
import { SupplierResponse } from "@types";

// Axios configuration instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

// Get all suppliers data
export async function getList() {
  return (await axiosInstance.get<SupplierResponse>(`/suppliers`)).data;
}
