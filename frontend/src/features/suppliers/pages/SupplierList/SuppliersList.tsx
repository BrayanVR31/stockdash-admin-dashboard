import { lazy, Suspense } from "react";
import { SquarePlus } from "lucide-react";
import Header from "@/components/Header";
import { SkeletonTable, TableProvider } from "@/components/table";
import delay from "@/utils/delay";
import { NavLink } from "react-router";

const SupplierTable = lazy(() => delay(import("./SupplierTable"), 3_10));

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
        <TableProvider>
          <SupplierTable />
        </TableProvider>
      </Suspense>
    </main>
  );
};

export { SuppliersList };
