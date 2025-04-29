import { stockdashInstance } from "./stockdashService";
import { Suppliers, Supplier } from "@/types/supplier";
import { SupplierInputs } from "@/models/supplierSchema";
import { ConfigResults } from "@/types/stockdash";

export const getSupplierList = async ({
  page = 1,
  perPage = 20,
}: ConfigResults) => {
  const query = `
    ?page=${page}&per_page=${perPage}
  `.trim();
  return (await stockdashInstance.get<Suppliers>(`/suppliers${query}`)).data;
};

export const addSupplier = async (supplier: SupplierInputs) => {
  return (await stockdashInstance.post<Suppliers>("/suppliers", supplier)).data;
};

export const getSupplierById = async (id: string) => {
  return (await stockdashInstance.get<Supplier>(`/suppliers/${id}`)).data;
};

export const updateSupplierById = async ({
  supplier,
  id,
}: {
  supplier: Partial<SupplierInputs>;
  id: string;
}) => {
  return (await stockdashInstance.patch<Supplier>(`/suppliers/${id}`, supplier))
    .data;
};

export const removeSupplierById = async (id: string) => {
  return (await stockdashInstance.delete(`/suppliers/${id}`)).data;
};

export const bulkDeletionSupplier = async (ids: string[]) => {
  return (
    await stockdashInstance.delete("/suppliers/bulk-delete", {
      data: {
        ids,
      },
    })
  ).data;
};
