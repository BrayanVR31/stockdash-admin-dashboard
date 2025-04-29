import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {
  addSale,
  getSaleById,
  getSaleList,
  removeSaleById,
  updateSaleById,
} from "@/services/sale";
import { useTable } from "@/components/table";
import { getQueryClient } from "@/QueryClient";

const client = getQueryClient();

export const useSaleList = () => {
  const { currentPage, perPage } = useTable();
  return useSuspenseQuery({
    queryKey: ["sales", { currentPage, perPage }],
    queryFn: () =>
      getSaleList({
        page: currentPage,
        perPage,
      }),
  });
};

export const useSaleItem = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["sale", id],
    queryFn: () => getSaleById(id),
  });
};

export const useCreateSale = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: addSale,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["sales", { currentPage, perPage }],
      }),
  });
};

export const useDestroySale = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: removeSaleById,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["sales", { currentPage, perPage }],
      }),
  });
};

export const useUpdateSale = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: updateSaleById,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["sales", { currentPage, perPage }],
      }),
  });
};
