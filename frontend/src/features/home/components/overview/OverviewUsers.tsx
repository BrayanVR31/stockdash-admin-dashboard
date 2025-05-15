import OverviewCard from "./OverviewCard";
import { useOverviewCount } from "@/hooks/useAnalytic";

const OverviewUsers = () => {
  const { data } = useOverviewCount();
  return (
    <OverviewCard
      type="users"
      value={data.user.allCount}
      title="Cantidad de usuarios"
    />
  );
};

export { OverviewUsers };
