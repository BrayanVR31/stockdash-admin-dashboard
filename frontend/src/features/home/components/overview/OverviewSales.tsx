import OverviewCard from "./OverviewCard";
import { useOverviewCount } from "@/hooks/useAnalytic";

const OverviewSales = () => {
  const { data } = useOverviewCount();
  return (
    <OverviewCard
      type="sales"
      value={data.sale.allCount}
      title="Cantidad de ventas"
    />
  );
};

export { OverviewSales };
