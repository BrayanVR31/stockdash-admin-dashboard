import { useMutation, useQuery } from "@tanstack/react-query";
import { productFetch } from "@services";

export function useProducts() {
  const mutation = useMutation({
    mutationFn: productFetch.createItem,
  });

  const query = useQuery({
    queryKey: ["products"],
    queryFn: () => productFetch.getList,
  });

  return {
    query,
    mutation,
  };
}
