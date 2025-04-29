import { useSuspenseQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  addCategory,
  getCategoryById,
  getCategoryList,
  removeCategoryById,
  updateCategoryById,
  getCategories,
} from "@/services/category";
import { useTable } from "@/components/table";
import { getQueryClient } from "@/QueryClient";

const client = getQueryClient();

export const useCategoryList = () => {
  const { currentPage, perPage } = useTable();
  return useSuspenseQuery({
    queryKey: ["categories", { currentPage, perPage }],
    queryFn: () =>
      getCategoryList({
        page: currentPage,
        perPage,
      }),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useCategoryItem = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: addCategory,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["categories"],
      }),
  });
};

export const useDestroyCategory = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: removeCategoryById,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["categories", { currentPage, perPage }],
      }),
  });
};

export const useUpdateCategory = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: updateCategoryById,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["categories", { currentPage, perPage }],
      }),
  });
};
