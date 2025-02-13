import { axiosInstance } from "./axios";
import { CategoryList } from "@/models";

// Get all category list
export const getCategories = async () => {
  const response = await axiosInstance.get<CategoryList>("/categories");
  return response.data;
};
