import { Category, Supplier } from "@types";

export interface Product {
  _id: string;
  name: string;
  categories: Category[];
  price: {
    purchase: number;
    sale: number;
  };
  description: string;
  quantity: number;
  suppliers: Supplier[];
  images: string[] | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type ProductInputs = Pick<
  Product,
  | "name"
  | "description"
  | "price"
  | "quantity"
  | "status"
  | "images"
  | "suppliers"
  | "categories"
>;
