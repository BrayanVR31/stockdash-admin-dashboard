import { useQuery } from "@tanstack/react-query";
import { supplierFetch } from "@services";

export function useSuppliers() {
  const query = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => supplierFetch.getList(),
  });
  return query;
}
