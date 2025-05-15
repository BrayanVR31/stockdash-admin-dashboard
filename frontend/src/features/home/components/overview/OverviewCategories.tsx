import OverviewCard from "./OverviewCard";
import { useOverviewCount } from "@/hooks/useAnalytic";

const OverviewCategories = () => {
  const { data } = useOverviewCount();
  return (
    <OverviewCard
      type="categories"
      value={data.category.allCount}
      title="Cantidad de categorías"
    />
  );
};

export { OverviewCategories };
