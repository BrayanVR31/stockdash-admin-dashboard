import { LoaderFunction } from "react-router";
import { getQueryClient } from "@/QueryClient";
import { getSaleById } from "@/services/sale";

export const saleLoader: LoaderFunction = (args) => {
  const client = getQueryClient();
  const { id = "" } = args.params || {};
  client.prefetchQuery({
    queryKey: ["sale", id],
    queryFn: () => getSaleById(id),
  });
};
