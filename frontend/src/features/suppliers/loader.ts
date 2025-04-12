import { LoaderFunction } from "react-router";
import { prefetchSupplier } from "@/hooks/useSupplier";

export const supplierLoader: LoaderFunction = async ({ params }) => {
  await prefetchSupplier(params.id || "");
  return true;
};
