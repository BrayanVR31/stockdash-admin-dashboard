import { Results, TimeStamps } from "./stockdash";
import { Supplier } from "./supplier";

export type Product = {
  name: string;
  categories: string[] | null;
  price: {
    purchase: number;
    sale: number;
  };
  description: string | null;
  quantity: number;
  suppliers: Supplier[];
  images: string[] | null;
  status: boolean;
} & TimeStamps;

export type Products = Results<Product>;
