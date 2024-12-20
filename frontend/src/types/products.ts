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

type BaseInputs = Pick<
  Product,
  "name" | "description" | "price" | "quantity" | "status" | "images"
>;

export interface ProductInputs extends BaseInputs {
  suppliers: string[];
  categories: string[];
}
