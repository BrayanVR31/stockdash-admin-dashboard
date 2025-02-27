import { useSuspenseQuery, useQuery, QueryClient } from "@tanstack/react-query";
import { getSuppliers } from "@/services";
import { usePagination } from "@/context/pagination";

export const useSupplier = () => {
  const { pagination } = usePagination();
  const getList = useSuspenseQuery({
    queryKey: ["suppliers"],
    queryFn: () => getSuppliers({ pagination }),
  });
  return { getList };
};

interface SupplierListOptions {
  withReactSelect?: boolean;
}

const useSupplierList = ({ withReactSelect = false }: SupplierListOptions) => {
  const query = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getSuppliers({}),
    select: (data) => {
      if (!withReactSelect) return data;
      return data.results.map(({ _id, name }) => ({ value: _id, label: name }));
    },
  });
  const suspenseQuery = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });

  return { query, suspenseQuery };
};

const prefetchSupplierList = () => {
  const queryClient = new QueryClient();
  return () =>
    queryClient.prefetchQuery({
      queryKey: ["suppliers"],
      queryFn: () => getSuppliers({}),
    });
};

const useSuspenseSupplierList = () => {
  const { pagination } = usePagination();
  return useSuspenseQuery({
    queryKey: ["suppliers", pagination],
    queryFn: () => getSuppliers({ pagination }),
  });
};

export { useSupplierList, prefetchSupplierList, useSuspenseSupplierList };
