import OverviewCard from "./OverviewCard";
import { useOverviewCount } from "@/hooks/useAnalytic";

const OverviewPurchases = () => {
  const { data } = useOverviewCount();
  return (
    <OverviewCard
      type="purchases"
      value={data.purchase.allCount}
      title="Cantidad de compras"
    />
  );
};

export { OverviewPurchases };
