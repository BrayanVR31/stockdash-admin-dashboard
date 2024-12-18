import { useQuery } from "@tanstack/react-query";
import { categoryFetch } from "@services";

export function useCategories() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryFetch.getList(),
  });
  return query;
}
