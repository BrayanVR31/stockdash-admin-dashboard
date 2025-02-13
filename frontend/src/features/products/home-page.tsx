import { lazy, Suspense } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  PaginatorSkeleton,
  TableSkeleton,
} from "@/components/ui/dashboard-skeleton";
import delay from "@/lib/delay";
import { Header, Button } from "@/components/ui/dashboard-crud";
import { PaginationProvider } from "@/context/pagination";

const ProductList = lazy(() => delay(import("./product-list"), 1850));
const ProductPaginator = lazy(() =>
  delay(import("./product-list/paginator"), 1850),
);

function HomePage() {
  const navigate = useNavigate();
  return (
    <PaginationProvider defaultPage={1} defaultPerPage={5}>
      <div>
        <Header title="Productos">
          <Button onClick={() => navigate({ pathname: "./create" })}>
            <Plus />
            <span>Agregar producto</span>
          </Button>
        </Header>
        <Suspense
          fallback={
            <TableSkeleton
              headingRows={[
                "Nombre",
                "Cantidad",
                "Precio de venta",
                "Precio de compra",
                "Status",
                "Opciones",
              ]}
              cells={5}
            />
          }
        >
          <ProductList />
        </Suspense>
        <div className="py-4">
          <Suspense fallback={<PaginatorSkeleton />}>
            <ProductPaginator />
          </Suspense>
        </div>
      </div>
    </PaginationProvider>
  );
}

export { HomePage };
