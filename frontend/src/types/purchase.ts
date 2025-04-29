import { Results, TimeStamps } from "./stockdash";

export type Purchase = {
  name: string;
  totalPrice: number;
  totalQuantity: number;
  supplier: string;
  purchaseDate: Date | null;
  products: string[];
  ticketImages: string[] | null;
} & TimeStamps;

export type Purchases = Results<Purchase>;
