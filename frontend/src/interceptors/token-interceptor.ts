import { AxiosError } from "axios";
import { axiosInstance } from "@/services";
import { AxiosResponseError } from "@/models";

const handlingToken = () => {
  axiosInstance.interceptors.request.use((request) => {
    const token = JSON.parse(window.localStorage.getItem("token")!);
    request.headers.Authorization = `Bearer ${token.state.token}`;
    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<AxiosResponseError>) => {
      const { response } = error;
      if (response) {
        if (response.data.error.type === "TOKEN_EXPIRATION") {
          axiosInstance.get("/refresh").then((response) => {
            console.log("refresh..");
            const object = JSON.parse(window.localStorage.getItem("token")!);
            object.state.token = response.data.token;
            window.localStorage.setItem("token", JSON.stringify(object));
          });
        }
      }
    },
  );
};

export { handlingToken };
