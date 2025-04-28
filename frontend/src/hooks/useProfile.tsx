import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getAccount, updateAccount } from "@/services/account";
import { getQueryClient } from "@/QueryClient";

const client = getQueryClient();

export const useProfileSession = () => {
  return useSuspenseQuery({
    queryKey: ["account"],
    queryFn: getAccount,
  });
};

export const useUpdateAccount = () => {
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["account"],
      });
    },
  });
};
