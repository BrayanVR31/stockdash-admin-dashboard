import { stockdashInstance } from "./stockdashService";
import { Account, ProfileForm } from "@/types/account";
import { AccountInputs } from "@/models/accountSchema";

export const getAccount = async () => {
  return (await stockdashInstance.get<Account>("/account")).data;
};

export const updateAccount = async (data: Partial<AccountInputs>) => {
  return (await stockdashInstance.patch<Account>("/account", data)).data;
};
