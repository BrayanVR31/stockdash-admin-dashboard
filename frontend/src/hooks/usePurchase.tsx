import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {
  addPurchase,
  getPurchaseById,
  getPurchaseList,
  removePurchaseById,
  updatePurchaseById,
} from "@/services/purchase";
import { useTable } from "@/components/table";
import { getQueryClient } from "@/QueryClient";

const client = getQueryClient();

export const usePurchaseList = () => {
  const { currentPage, perPage } = useTable();
  return useSuspenseQuery({
    queryKey: ["purchases", { currentPage, perPage }],
    queryFn: () =>
      getPurchaseList({
        page: currentPage,
        perPage,
      }),
  });
};

export const usePurchaseItem = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["purchase", id],
    queryFn: () => getPurchaseById(id),
  });
};

export const useCreatePurchase = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: addPurchase,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["purchases", { currentPage, perPage }],
      }),
  });
};

export const useDestroyPurchase = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: removePurchaseById,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["purchases", { currentPage, perPage }],
      }),
  });
};

export const useUpdatePurchase = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: updatePurchaseById,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["purchases", { currentPage, perPage }],
      }),
  });
};
