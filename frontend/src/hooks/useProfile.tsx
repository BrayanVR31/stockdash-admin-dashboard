import { useSuspenseQuery } from "@tanstack/react-query";
import { getAccount } from "@/services/account";

export const useProfileSession = () => {
  return useSuspenseQuery({
    queryKey: ["account"],
    queryFn: getAccount,
  });
};
