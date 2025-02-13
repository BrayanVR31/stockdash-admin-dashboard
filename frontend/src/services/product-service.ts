import { axiosInstance } from "./axios";
import { ProductList, ProductItem, Product } from "@/models";
import { RequestParams } from "@/models/request-model";

// Get all product items
const getProducts = async ({ pagination }: RequestParams) => {
  const { page, perPage = 5 } = pagination!;
  const response = await axiosInstance.get<ProductList>(
    `/products?per_page=${perPage}&page=${page}`,
  );
  return response.data;
};

// Get a specific product item
const getProductById = async (id: string) => {
  const response = await axiosInstance.get<ProductItem>(`/products/${id}`);
  return response.data;
};

// Create a single product item
const addProduct = async (product: Product) => {
  const response = await axiosInstance.post<ProductItem>("/products", product);
  return response.data;
};

// Update a specific product item
const updateProduct = async (id: string) => {
  const response = await axiosInstance.patch<ProductItem>(`/products/${id}`);
  return response.data;
};

// Delete a single product item
const deleteProduct = async (id: string) =>
  await axiosInstance.delete(`/products/${id}`);

export {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
