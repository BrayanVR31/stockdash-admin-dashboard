import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {
  addProduct,
  getProductById,
  getProductList,
  removeProductById,
  updateProductById,
} from "@/services/product";
import { useTable } from "@/components/table";
import { getQueryClient } from "@/QueryClient";

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

export const useProductItem = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
};

export const useCreateProduct = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["products", { currentPage, perPage }],
      }),
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
