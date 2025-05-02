import { AxiosError } from "axios";
import { toaster } from "@/components/ui/toaster";
import { stockdashInstance } from "@/services/stockdashService";
import { useSystemError } from "@/store/systemErrorStore";
import { ApiError } from "@/types/error";
import { matchErrorResponse } from "./matchError";

export const handlingResponses = () => {
  stockdashInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      const systemError = useSystemError.getState();
      if (error instanceof AxiosError) {
        const { error: e } = error.response?.data as ApiError;
        const errorState = matchErrorResponse?.[e.type];
        if (errorState) systemError.setSystemError(errorState);
      }
    }
  );
};
