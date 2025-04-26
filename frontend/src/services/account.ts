import { stockdashInstance } from "./stockdashService";
import { Account } from "@/types/account";

export const getAccount = async () => {
  return (await stockdashInstance.get<Account>("/account")).data;
};
