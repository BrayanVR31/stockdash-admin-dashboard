import axios from "axios";
import { SupplierInput, SupplierResponse } from "../types";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1", 
});

// Get all suppliers data
export async function getSuppliers() {
  const response = await instance.get<SupplierResponse>("/suppliers");
  return response.data;
}

// Save supplier information
export async function createSupplier(data: SupplierInput) {
  const response = await instance.post("/suppliers", data);
  return response;
}
