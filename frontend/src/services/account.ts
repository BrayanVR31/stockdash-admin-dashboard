import { stockdashInstance } from "./stockdashService";
import { Account, ProfileForm } from "@/types/account";

export const getAccount = async () => {
  return (await stockdashInstance.get<Account>("/account")).data;
};

export const updateAccount = async (data: Partial<ProfileForm>) => {
  return (await stockdashInstance.patch<Account>("/account", data)).data;
};
