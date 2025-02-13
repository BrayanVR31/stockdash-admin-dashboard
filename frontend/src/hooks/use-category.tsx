import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services";

const useCategory = () => {
  const getList = useSuspenseQuery({
    queryKey: ["view-categories"],
    queryFn: getCategories,
  });

  return { getList };
};

interface CategoryListOptions {
  withReactSelect?: boolean;
}

const useCategoryList = ({ withReactSelect = false }: CategoryListOptions) => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => {
      if (!withReactSelect) return data;
      return data.results.map(({ _id, name }) => ({ value: _id, label: name }));
    },
  });
  const suspenseQuery = useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => {
      if (!withReactSelect) return data;
      return data.results.map(({ _id, name }) => ({ value: _id, label: name }));
    },
  });
  return { query, suspenseQuery };
};

export { useCategory, useCategoryList };
