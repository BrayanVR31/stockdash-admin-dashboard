import OverviewCard from "./OverviewCard";
import { useSupplierList } from "@/hooks/useSupplier";

const OverviewSuppliers = () => {
  const { data } = useSupplierList();
  return (
    <OverviewCard
      type="suppliers"
      value={data.total}
      title="Cantidad de proveedores"
    />
  );
};

export { OverviewSuppliers };
