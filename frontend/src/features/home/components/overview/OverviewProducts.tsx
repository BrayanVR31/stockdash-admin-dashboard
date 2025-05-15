import OverviewCard from "./OverviewCard";
import { useOverviewCount } from "@/hooks/useAnalytic";

const OverviewProducts = () => {
  const { data } = useOverviewCount();
  return (
    <OverviewCard
      type="products"
      value={data.product.allCount}
      title="Cantidad de productos"
    />
  );
};

export { OverviewProducts };
