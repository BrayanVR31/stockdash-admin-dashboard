import { lazy, Suspense } from "react";
import { SquarePlus } from "lucide-react";
import Header from "@/components/Header";
import { SkeletonTable } from "@/components/table";
import delay from "@/utils/delay";
import { NavLink } from "react-router";

const SupplierTable = lazy(() => delay(import("../components/SupplierTable")));

const SuppliersList = () => {
  return (
    <main>
      <Header
        title="Lista de proveedores"
        description="Lista de información de todos los proveedores registrados."
        leftSide={
          <>
            <NavLink to="./form" className="btn btn-primary">
              <SquarePlus className="w-4.5" />
              <span className="hidden sm:block">Crear</span>
            </NavLink>
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
