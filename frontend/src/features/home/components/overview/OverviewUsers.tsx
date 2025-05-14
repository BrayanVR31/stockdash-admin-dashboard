import OverviewCard from "./OverviewCard";
import { useUserList } from "@/hooks/useUser";

const OverviewUsers = () => {
  const { data } = useUserList();
  return (
    <OverviewCard
      type="users"
      value={data.total}
      title="Cantidad de usuarios"
    />
  );
};

export { OverviewUsers };
