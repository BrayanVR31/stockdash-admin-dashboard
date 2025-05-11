import { AxiosError } from "axios";
import { stockdashInstance } from "@/services/stockdashService";
import useSystemErrorStore, { SysError } from "@/store/systemErrorStore";
import { concatSiblingPaths, getPrevPath } from "@/utils/paths";

export const handlingResponses = () => {
  stockdashInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error instanceof AxiosError) {
        const errorRes = error.response?.data?.error;
        const typeError: SysError | null = errorRes?.type || null;
        const { setSysError } = useSystemErrorStore.getState();
        const location = window.location;
        const currentResource = getPrevPath(location.pathname, "create");
        const originPath = concatSiblingPaths(
          location.pathname,
          currentResource,
        );
        console.log({ currentResource, originPath });
        setSysError(typeError, originPath);
      }
    },
  );
};
