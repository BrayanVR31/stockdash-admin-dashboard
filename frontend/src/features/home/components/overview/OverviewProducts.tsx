import OverviewCard from "./OverviewCard";
import { useProductList } from "@/hooks/useProduct";

const OverviewProducts = () => {
  const { data } = useProductList();
  return (
    <OverviewCard
      type="products"
      value={data.total}
      title="Cantidad de productos"
    />
  );
};

export { OverviewProducts };
