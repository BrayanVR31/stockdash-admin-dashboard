import {
  useSuspenseQuery,
  useQuery,
  QueryClient,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getSuppliers,
  addSupplier,
  deleteSupplier,
  deleteSuppliers,
  getSupplier,
} from "@/services/supplier";
import { useTable, PaginationTable } from "@/components/table";
import { getQueryClient } from "@/QueryClient";

const queryClient = getQueryClient();

export const useSupplierList = () => {
  const {
    paginating: { currentPage: page, perPage },
  } = useTable() as PaginationTable;
  return useSuspenseQuery({
    queryKey: ["suppliers", { page, perPage }],
    queryFn: () =>
      getSuppliers({
        pagination: { page, perPage },
      }),
  });
};

export const useCreateSupplier = () => {
  return useMutation({
    mutationFn: addSupplier,
    onError: (e) => console.log(e),
  });
};

export const useDeleteSupplier = () => {
  const {
    paginating: { currentPage: page, perPage },
  } = useTable() as PaginationTable;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSupplier,
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: ["suppliers", { page, perPage }],
      });
    },
  });
};

export const useBulkDeleteSuppliers = () => {
  const {
    paginating: { currentPage: page, perPage },
  } = useTable() as PaginationTable;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSuppliers,
    onSuccess: (res) => {
      console.log("Bulk delete success:", res);
      queryClient.invalidateQueries({
        queryKey: ["suppliers", { page, perPage }],
      });
    },
    onError: (e) => {
      console.error("Bulk delete error:", e);
      toast.error("Ha ocurrido un problema.", {
        className: "bg-slate-800",
      });
    },
  });
};

export const prefetchSupplier = async (id: string) => {
  return await queryClient.prefetchQuery({
    queryKey: ["suppliers", id],
    queryFn: () => getSupplier(id),
  });
};

export const useGetSupplier = (id: string) => {
  return useQuery({
    queryKey: ["suppliers", id],
    queryFn: () => getSupplier(id),
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
