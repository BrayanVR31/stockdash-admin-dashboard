import { stockdashInstance } from "./stockdashService";
import { Account } from "@/types/account";
import { Results, ConfigResults } from "@/types/stockdash";
import { UserInputs } from "@/models/userSchema";

export const getUserList = async ({
  page = 1,
  perPage = 20,
}: ConfigResults) => {
  const query = `
    ?page=${page}&per_page=${perPage}
  `.trim();
  return (await stockdashInstance.get<Results<Account>>(`/users${query}`)).data;
};

export const getUsers = async () => {
  const query = `?with_pagination=0`.trim();
  return (await stockdashInstance.get<Account[]>(`/users${query}`)).data;
};

export const bulkUserList = async (ids: string[]) => {
  return (
    await stockdashInstance.delete(`/users/bulk`, {
      data: {
        ids,
      },
    })
  ).data;
};

export const deleteUser = async (id: string) => {
  return (await stockdashInstance.delete(`/users/${id}`)).data;
};

export const createUser = async (user: UserInputs) => {
  return (await stockdashInstance.post("/users", user)).data;
};

export const updateUser = async ({
  id,
  user,
}: {
  id: string;
  user: UserInputs;
}) => {
  return (await stockdashInstance.put(`/users/${id}`, user)).data;
};

export const getUserById = async (id: string) => {
  return (
    await stockdashInstance.put<Account & { password: string }>(`/users/${id}`)
  ).data;
};
