import OverviewCard from "./OverviewCard";
import { useOverviewCount } from "@/hooks/useAnalytic";

const OverviewSuppliers = () => {
  const { data } = useOverviewCount();
  return (
    <OverviewCard
      type="suppliers"
      value={data.supplier.allCount}
      title="Cantidad de proveedores"
    />
  );
};

export { OverviewSuppliers };
