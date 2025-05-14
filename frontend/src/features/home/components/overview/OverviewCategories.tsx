import OverviewCard from "./OverviewCard";
import { useCategoryList } from "@/hooks/useCategory";

const OverviewCategories = () => {
  const { data } = useCategoryList();
  return (
    <OverviewCard
      type="categories"
      value={data.total}
      title="Cantidad de categorías"
    />
  );
};

export { OverviewCategories };
