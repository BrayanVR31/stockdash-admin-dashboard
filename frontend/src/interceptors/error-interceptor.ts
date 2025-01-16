import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "@/services";
import { AxiosResponseError } from "@/models";

function handlingErrors() {
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    (error: AxiosError<AxiosResponseError>) => {
      const { response } = error;
      if (!response) throw new Error("Unknown axios error");

      const { data } = response;
      console.log(data.error);
      // Execute each error on toaster ui component
    },
  );
}

export { handlingErrors };
