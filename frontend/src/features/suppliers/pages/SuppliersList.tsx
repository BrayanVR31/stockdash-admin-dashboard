import { lazy, Suspense } from "react";
import { SquarePlus } from "lucide-react";
import Header from "@/components/Header";
import { SkeletonTable } from "@/components/table";
import delay from "@/utils/delay";

const SupplierTable = lazy(() => delay(import("../components/SupplierTable")));

const SuppliersList = () => {
  return (
    <main>
      <Header
        title="Lista de proveedores"
        description="Lista de información de todos los proveedores registrados."
        leftSide={
          <>
            <button className="btn btn-primary">
              <SquarePlus className="w-4.5" />
              <span>Crear</span>
            </button>
          </>
        }
      />
      <Suspense fallback={<SkeletonTable rows={5} cols={4} />}>
        <SupplierTable />
      </Suspense>
    </main>
  );
};

export { SuppliersList };
