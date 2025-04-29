import { stockdashInstance } from "./stockdashService";
import { Purchases, Purchase } from "@/types/purchase";
import { PurchaseInputs } from "@/models/purchaseSchema";
import { ConfigResults } from "@/types/stockdash";

export const getPurchaseList = async ({
  page = 1,
  perPage = 20,
}: ConfigResults) => {
  const query = `
    ?page=${page}&per_page=${perPage}
  `.trim();
  return (await stockdashInstance.get<Purchases>(`/purchases${query}`)).data;
};

export const addPurchase = async (purchase: PurchaseInputs) => {
  return (await stockdashInstance.post<Purchases>("/purchases", purchase)).data;
};

export const getPurchaseById = async (id: string) => {
  return (await stockdashInstance.get<Purchase>(`/purchases/${id}`)).data;
};

export const updatePurchaseById = async ({
  purchase,
  id,
}: {
  purchase: Partial<PurchaseInputs>;
  id: string;
}) => {
  return (await stockdashInstance.patch<Purchase>(`/purchases/${id}`, purchase))
    .data;
};

export const removePurchaseById = async (id: string) => {
  return (await stockdashInstance.delete(`/purchases/${id}`)).data;
};
