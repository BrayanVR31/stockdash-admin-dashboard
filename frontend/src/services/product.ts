import { stockdashInstance } from "./stockdashService";
import { Products, Product } from "@/types/product";
import { ProductInputs } from "@/models/productSchema";
import { ConfigResults } from "@/types/stockdash";

export const getProductList = async ({
  page = 1,
  perPage = 20,
}: ConfigResults) => {
  const query = `
    ?page=${page}&per_page=${perPage}
  `.trim();
  return (await stockdashInstance.get<Products>(`/products${query}`)).data;
};

export const getProducts = async () => {
  const query = `?with_pagination=0`.trim();
  return (await stockdashInstance.get<Products["results"]>(`/products${query}`))
    .data;
};

export const addProduct = async (product: ProductInputs) => {
  return (await stockdashInstance.post<Products>("/products", product)).data;
};

export const getProductById = async (id: string) => {
  return (await stockdashInstance.get<Product>(`/products/${id}`)).data;
};

export const updateProductById = async ({
  product,
  id,
}: {
  product: Partial<ProductInputs>;
  id: string;
}) => {
  return (await stockdashInstance.patch<Product>(`/products/${id}`, product))
    .data;
};

export const removeProductById = async (id: string) => {
  return (await stockdashInstance.delete(`/products/${id}`)).data;
};
