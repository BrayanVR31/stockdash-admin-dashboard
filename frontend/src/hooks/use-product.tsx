import {
  useMutation,
  useSuspenseQuery,
  usePrefetchQuery,
  QueryClient,
} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { addProduct, getProducts, getProductById } from "@/services";
import { usePagination } from "@/context/pagination";

function useProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const { pagination } = usePagination();
  const add = useMutation({
    mutationKey: ["add-product"],
    mutationFn: addProduct,
    onSuccess: () => navigate({ pathname: "../" }),
  });
  const getList = useSuspenseQuery({
    queryKey: ["view-products", pagination],
    queryFn: () => getProducts({ pagination }),
  });

  const getItem = useSuspenseQuery({
    queryKey: ["view-product"],
    queryFn: () => getProductById(params.id || ""),
  });
  return { add, getList, getItem };
}

type GetProduct = { id: string };
function getProduct({ id }: GetProduct) {
  return useSuspenseQuery({
    queryKey: ["view-product", id],
    queryFn: () => getProductById(id),
  });
}

const prefetchProduct = () => {
  const queryClient = new QueryClient();
  return (id: string) =>
    queryClient.prefetchQuery({
      queryKey: ["view-product", id],
      queryFn: () => getProductById(id),
    });
};

export { useProduct, getProduct, prefetchProduct };
