import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
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
      toaster.create({
        description: "Se han actualizado los datos de forma correcta.",
        type: "success",
      });
    },
  });
};
