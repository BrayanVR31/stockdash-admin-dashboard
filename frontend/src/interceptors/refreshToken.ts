import { AxiosError } from "axios";
import { stockdashInstance, memoryToken } from "@/services/stockdashService";

interface FetchError {
  error: {
    message: string;
    status: number;
    type: string;
  };
}

export const refetchingToken = () => {
  stockdashInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<FetchError>) => {
      // Fetching a new refresh access token
      const errorType = error.response?.data?.error.type;
      const url = error.response?.config.url;
      if (
        error.status === 401 &&
        (errorType === "REQUIRED_TOKEN" || errorType === "TOKEN_EXPIRATION")
      ) {
        const apiRefresh = (await stockdashInstance.get("/refresh")).data;
        memoryToken.refresh = apiRefresh.token;
      } else {
        return Promise.reject(error);
      }
    },
  );

  stockdashInstance.interceptors.request.use((request) => {
    // Append the refresh token on request
    if (memoryToken.refresh)
      request.headers.Authorization = `Bearer ${memoryToken.refresh}`;
    return request;
  });
};
