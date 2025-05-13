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
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";

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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addSale,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["sales", { currentPage, perPage }],
      });
      toaster.create({
        type: "success",
        title: "Registro exitoso",
        description: "Se han registrado los datos de satisfactoriamente.",
      });
      navigate("..");
    },
  });
};

export const useDestroySale = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: removeSaleById,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["sales", { currentPage, perPage }],
      });
      toaster.create({
        title: "Venta eliminada correctamente",
        description:
          "La venta ha sido eliminado de forma satisfactoria del sistema.",
        type: "success",
      });
    },
  });
};

export const useUpdateSale = () => {
  const { currentPage, perPage } = useTable();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateSaleById,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["sales", { currentPage, perPage }],
      });
      toaster.create({
        title: "Venta actualizada correctamente",
        description:
          "La información de la venta ha sido actualizada exitosamente.",
        type: "success",
      });
      navigate("..");
    },
  });
};
