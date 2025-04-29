import { useSuspenseQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  addSupplier,
  getSupplierById,
  getSupplierList,
  removeSupplierById,
  updateSupplierById,
} from "@/services/supplier";
import { useTable } from "@/components/table";
import { getQueryClient } from "@/QueryClient";

const client = getQueryClient();

export const useSupplierList = () => {
  const { currentPage, perPage } = useTable();
  return useSuspenseQuery({
    queryKey: ["suppliers", { currentPage, perPage }],
    queryFn: () =>
      getSupplierList({
        page: currentPage,
        perPage,
      }),
  });
};

export const useSuppliers = () => {
  const { currentPage, perPage } = useTable();
  return useQuery({
    queryKey: ["suppliers", { currentPage, perPage }],
    queryFn: () =>
      getSupplierList({
        page: currentPage,
        perPage,
      }),
  });
};

export const useSupplierItem = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["supplier", id],
    queryFn: () => getSupplierById(id),
  });
};

export const useCreateSupplier = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: addSupplier,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["suppliers", { currentPage, perPage }],
      }),
  });
};

export const useDestroySupplier = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: removeSupplierById,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["suppliers", { currentPage, perPage }],
      }),
  });
};

export const useUpdateSupplier = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: updateSupplierById,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["suppliers", { currentPage, perPage }],
      }),
  });
};
