import { useSuspenseQuery, useMutation, useQuery } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import {
  addProduct,
  getProductById,
  getProductList,
  removeProductById,
  updateProductById,
  getProducts,
} from "@/services/product";
import { useTable } from "@/components/table";
import { getQueryClient } from "@/QueryClient";
import { useNavigate } from "react-router";

const client = getQueryClient();

export const useProductList = () => {
  const { currentPage, perPage } = useTable();
  return useSuspenseQuery({
    queryKey: ["products", { currentPage, perPage }],
    queryFn: () =>
      getProductList({
        page: currentPage,
        perPage,
      }),
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useProductItem = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
};

export const useCreateProduct = () => {
  const { currentPage, perPage } = useTable();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["products", { currentPage, perPage }],
      });
      toaster.create({
        description: "Se han actualizado los datos de forma correcta.",
        type: "success",
      });
      navigate("..");
    },
  });
};

export const useDestroyProduct = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: removeProductById,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["products", { currentPage, perPage }],
      }),
  });
};

export const useUpdateProduct = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: updateProductById,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["products", { currentPage, perPage }],
      }),
  });
};
