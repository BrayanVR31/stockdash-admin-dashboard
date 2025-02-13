import { SingleResponse, PaginatedResponse } from "./response-model";

interface Category {
  name: string;
}

type CategoryItem = SingleResponse<Category>;
type CategoryList = PaginatedResponse<Category>;

export type { Category, CategoryItem, CategoryList };
