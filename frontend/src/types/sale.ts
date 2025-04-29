import { Results, TimeStamps } from "./stockdash";

export type Sale = {
  products: string[];
  totalAmount: number;
  saleDate: Date | null;
  user: string;
  status: "completed" | "pending" | "canceled";
} & TimeStamps;

export type Sales = Results<Sale>;
