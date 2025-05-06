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
import { toaster } from "@/components/ui/toaster";

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
    onSuccess: () => {
      toaster.create({
        title: "Proveedor agregado correctamente",
        description:
          "El nuevo proveedor ha sido registrado exitosamente en el sistema.",
        type: "success",
      });
      client.invalidateQueries({
        queryKey: ["suppliers", { currentPage, perPage }],
      });
    },
  });
};

export const useDestroySupplier = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: removeSupplierById,
    onSuccess: () => {
      toaster.create({
        title: "Proveedor eliminado correctamente",
        description:
          "El proveedor ha sido eliminado de forma satisfactoria del sistema.",
        type: "success",
      });
      client.invalidateQueries({
        queryKey: ["suppliers", { currentPage, perPage }],
      });
    },
  });
};

export const useUpdateSupplier = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: updateSupplierById,
    onSuccess: () => {
      toaster.create({
        title: "Proveedor actualizado correctamente",
        description:
          "La información del proveedor ha sido actualizada exitosamente.",
        type: "success",
      });
      client.invalidateQueries({
        queryKey: ["suppliers", { currentPage, perPage }],
      });
    },
  });
};

/**
  bulk deletion:
  toaster.create({
    title: "Proveedores eliminados correctamente",
    description:
      "Los proveedores seleccionados han sido eliminados exitosamente del sistema.",
    type: "success",
  });
*/
