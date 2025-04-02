import {
  useSuspenseQuery,
  useQuery,
  QueryClient,
  useMutation,
} from "@tanstack/react-query";
import { getSuppliers } from "@/services/supplier";
import { FetchParams } from "@/types/responseObject";

export const useSupplierList = (config: FetchParams) => {
  const { pagination } = config;
  return useSuspenseQuery({
    queryKey: ["suppliers", pagination],
    queryFn: () => getSuppliers({ pagination }),
  });
};

/*

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

export const useSupplierMutation = () => {
  const makeSupplier = useMutation({
    mutationFn: addSupplier,
    onError: (error) => {
      console.log(error);
      toast.error("Ha ocurrido un problema.", {
        theme: "dark",
        className: "bg-slate-800",
      });
    },
    onSuccess: () => {
      toast.success("Se ha guardado con éxito.", {
        theme: "dark",
        className: "bg-slate-800",
      });
    },
  });
  return { makeSupplier };
};

export { useSupplierList, prefetchSupplierList, useSuspenseSupplierList };
*/
