import { AxiosError } from "axios";
import { stockdashInstance } from "@/services/stockdashService";
import useSystemErrorStore, { SysError } from "@/store/systemErrorStore";

export const handlingResponses = () => {
  stockdashInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error instanceof AxiosError) {
        const errorRes = error.response?.data?.error;
        const typeError: SysError | null = errorRes?.type || null;
        const { setSysError } = useSystemErrorStore.getState();
        setSysError(typeError, "users");
      }
    },
  );
};
