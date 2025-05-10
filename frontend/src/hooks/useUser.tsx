import { useSuspenseQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserList,
  bulkUserList,
  deleteUser,
  getUsers,
} from "@/services/user";
import { useTable } from "@/components/table";
import { getQueryClient } from "@/QueryClient";

const client = getQueryClient();

export const useUserList = () => {
  const { currentPage, perPage } = useTable();
  return useSuspenseQuery({
    queryKey: ["users", { currentPage, perPage }],
    queryFn: () =>
      getUserList({
        page: currentPage,
        perPage,
      }),
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useBulkUsers = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: bulkUserList,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["users", { currentPage, perPage }],
      }),
  });
};

export const useDestroyUser = () => {
  const { currentPage, perPage } = useTable();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["users", { currentPage, perPage }],
      }),
  });
};
