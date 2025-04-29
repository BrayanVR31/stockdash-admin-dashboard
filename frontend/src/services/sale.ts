import { stockdashInstance } from "./stockdashService";
import { Sales, Sale } from "@/types/sale";
import { ConfigResults } from "@/types/stockdash";
import { SaleInputs } from "@/models/saleSchema";

export const getSaleList = async ({
  page = 1,
  perPage = 20,
}: ConfigResults) => {
  const query = `
    ?page=${page}&per_page=${perPage}
  `.trim();
  return (await stockdashInstance.get<Sales>(`/sales${query}`)).data;
};

export const addSale = async (sale: SaleInputs) => {
  return (await stockdashInstance.post<Sales>("/sales", sale)).data;
};

export const getSaleById = async (id: string) => {
  return (await stockdashInstance.get<Sale>(`/sales/${id}`)).data;
};

export const updateSaleById = async ({
  sale,
  id,
}: {
  sale: Partial<SaleInputs>;
  id: string;
}) => {
  return (await stockdashInstance.patch<Sale>(`/sales/${id}`, sale)).data;
};

export const removeSaleById = async (id: string) => {
  return (await stockdashInstance.delete(`/sales/${id}`)).data;
};
