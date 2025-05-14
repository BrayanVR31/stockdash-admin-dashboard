import OverviewCard from "./OverviewCard";
import { useProductList } from "@/hooks/useProduct";

const OverviewPurchases = () => {
  const { data } = useProductList();
  return (
    <OverviewCard
      type="purchases"
      value={data.total}
      title="Cantidad de compras"
    />
  );
};

export { OverviewPurchases };
