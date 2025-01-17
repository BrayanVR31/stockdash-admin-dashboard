import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "@/services";
import { AxiosResponseError } from "@/models";
import { ValidationError } from "@/lib";

/**
 * Handling each response error provided
 * by web server api calls.
 */
function handlingErrors() {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (axiosError: AxiosError<AxiosResponseError>) => {
      const { response } = axiosError;
      const { error } = response!.data;
      console.log(error);
      const errorType = ValidationError.getErrorKey(error.type);
      toast(errorType, {
        delay: 2000,
        hideProgressBar: true,
        type: "error",
        className:
          "border text-neutral-900 dark:bg-slate-900 dark:text-white text-sm dark:[&>button]:text-slate-100 [&>button]:text-neutral-900 font-sans dark:border-gray-400/85",
        autoClose: 2000,
      });
      return Promise.reject(axiosError);
    },
  );
}

export { handlingErrors };
