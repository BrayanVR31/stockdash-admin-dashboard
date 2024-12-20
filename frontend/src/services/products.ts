import axios from "axios";
import { Product, ProductInputs, DataResponse } from "@types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

type ProductRes = DataResponse<Product>;

// Create a new products
export const createItem = async (item: ProductInputs) =>
  (await axiosInstance.post<Product>("/products", item)).data;

// Get all product list
export const getList = async () =>
  (await axiosInstance.get<ProductRes>("/products")).data;
