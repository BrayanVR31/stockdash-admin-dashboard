import { Suspense, lazy } from "react";
import {
  StatusCard,
  PriceCard,
  DetailCard,
  SkeletonSelect,
} from "./components";
import { FormCard, CardTitle } from "@/components/ui/custom-form";

const delay = <T,>(promise: Promise<T>) =>
  new Promise((resolve) => setTimeout(resolve, 1400)).then(() => promise);
// Dynamic component imports
const CategoryCard = lazy(() => delay(import("./components/category-card")));
const SupplierCard = lazy(() => delay(import("./components/supplier-card")));

function FormCreate() {
  const headerCards = {
    category: (
      <div>
        <CardTitle>Categorías</CardTitle>
      </div>
    ),
    supplier: (
      <div>
        <CardTitle>Proveedores</CardTitle>
      </div>
    ),
  };
  return (
    <div className="grid gap-x-4 gap-y-4 grid-cols-product grid-rows-product auto-rows-product grid-flow-row">
      {/** Supplier card */}
      <div className="row-start-1">
        <FormCard header={headerCards.supplier}>
          <div className="relative mb-6">
            <Suspense fallback={<SkeletonSelect />}>
              <SupplierCard />
            </Suspense>
          </div>
        </FormCard>
      </div>
      <div className="col-start-1 row-start-2">
        <PriceCard />
      </div>
      <div className="col-start-1 row-start-3 row-span-1">
        <StatusCard />
      </div>
      <div className="col-start-2 row-start-2 row-span-2">
        <DetailCard />
      </div>
      {/** Category card */}
      <div className="col-start-2 row-start-1">
        <FormCard header={headerCards.category}>
          <div className="relative mb-6">
            <Suspense fallback={<SkeletonSelect />}>
              <CategoryCard />
            </Suspense>
          </div>
        </FormCard>
      </div>
    </div>
  );
}

export { FormCreate };
