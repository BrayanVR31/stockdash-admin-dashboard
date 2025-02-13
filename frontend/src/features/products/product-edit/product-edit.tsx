import { lazy, Suspense } from "react";
import delay from "@/lib/delay";
import SkeletonEdit from "./skeleton-edit";
import { Header } from "@/components/ui/dashboard-crud";

const FormEdit = lazy(() => delay(import("./form-edit"), 1400));

const ProductEdit = () => {
  return (
    <>
      <Header title="Editar producto">
        <button type="submit">Actualizar</button>
      </Header>
      <Suspense fallback={<SkeletonEdit />}>
        <FormEdit />
      </Suspense>
    </>
  );
};

export default ProductEdit;
