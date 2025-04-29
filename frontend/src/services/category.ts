import { stockdashInstance } from "./stockdashService";
import { Categories, Category } from "@/types/category";
import { ConfigResults } from "@/types/stockdash";

type CategoryInputs = Pick<Category, "name">;

export const getCategoryList = async ({
  page = 0,
  perPage = 0,
}: ConfigResults) => {
  const query = `
    ?page=${page}&per_page=${perPage}
  `.trim();
  return (await stockdashInstance.get<Categories>(`/categories${query}`)).data;
};

export const getCategories = async () => {
  return (
    await stockdashInstance.get<Categories["results"]>(
      "/categories?with_pagination=0",
    )
  ).data;
};

export const addCategory = async (category: CategoryInputs) => {
  return (await stockdashInstance.post<Category>("/categories", category)).data;
};

export const getCategoryById = async (id: string) => {
  return (await stockdashInstance.get<Category>(`/categories/${id}`)).data;
};

export const updateCategoryById = async ({
  category,
  id,
}: {
  category: Partial<CategoryInputs>;
  id: string;
}) => {
  return (
    await stockdashInstance.patch<Category>(`/categories/${id}`, category)
  ).data;
};

export const removeCategoryById = async (id: string) => {
  return (await stockdashInstance.delete(`/categories/${id}`)).data;
};
