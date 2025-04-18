import { AxiosError } from "axios";
import { stockdashInstance } from "@/services/stockdashService";
import alert from "@/assets/alert.svg";
import { ErrorInfo } from "@/types/error";
import { DataError } from "@/types/responseObject";

const matchStatus: {
  [code: number]: {
    [type: string]: ErrorInfo;
  };
} = {
  401: {
    EXPIRED_SESSION: {
      message:
        "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión para continuar.",
      type: "login-again",
      ilustration: alert,
      statusCode: 401,
    },
  },
};

type onCatchError = (info: ErrorInfo) => void;

export const handlingResponses = (onCatchError?: onCatchError) => {
  stockdashInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error instanceof AxiosError) {
        const { status } = error.response!;
        const data: DataError = error.response!.data;

        if (onCatchError) onCatchError(matchStatus[status][data.error.type]);
      }
    },
  );
};
