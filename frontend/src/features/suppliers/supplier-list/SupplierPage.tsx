import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router";
import { PaginationProvider } from "@/context/pagination";
import delay from "@/lib/delay";
import SupplierSkeleton from "./SupplierSkeleton";

const SupplierTable = lazy(() => delay(import("./Table"), 14000));

const SupplierPage = () => {
  const [searchParams] = useSearchParams();
  const defaultPage = !searchParams.get("page")
    ? 1
    : +searchParams.get("page")!;
  return (
    <PaginationProvider defaultPage={defaultPage} defaultPerPage={5}>
      <Suspense fallback={<SupplierSkeleton />}>
        <SupplierTable />
      </Suspense>
    </PaginationProvider>
  );
};

export { SupplierPage };
