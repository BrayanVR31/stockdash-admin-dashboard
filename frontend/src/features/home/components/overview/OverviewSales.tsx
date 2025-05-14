import OverviewCard from "./OverviewCard";
import { useSaleList } from "@/hooks/useSale";

const OverviewSales = () => {
  const { data } = useSaleList();
  return (
    <OverviewCard type="sales" value={data.total} title="Cantidad de ventas" />
  );
};

export { OverviewSales };
