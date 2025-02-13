import { PaginatedResponse, SingleResponse } from "./response-model";

interface Product {
  name: string;
  categories?: string[] | null;
  price: Price;
  description?: string | null;
  quantity?: number;
  suppliers: string[];
  images?: string[] | null;
  status: boolean;
}

interface Price {
  purchase: number;
  sale: number;
}

type ProductList = PaginatedResponse<Product>;
type ProductItem = SingleResponse<Product>;

export type { Product, ProductList, ProductItem };
