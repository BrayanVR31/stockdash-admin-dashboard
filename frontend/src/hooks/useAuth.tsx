import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AxiosError } from "axios";
import { memoryToken } from "@/services/stockdashService";
import { login, logout } from "@/services/authentication";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { getQueryClient } from "@/QueryClient";
import useSystemErrorStore from "@/store/systemErrorStore";

const client = getQueryClient();

interface FormattedError {
  key: "email" | "password";
  message: string;
}

type ErrorKeys = "INVALID_PASSWORD" | "INVALID_EMAIL";

type MatchError = Record<ErrorKeys, FormattedError>;

const matchError: MatchError = {
  INVALID_PASSWORD: {
    key: "password",
    message: "La contraseña de usuario es incorrecta.",
  },
  INVALID_EMAIL: {
    key: "email",
    message: "El correo eléctronico no existe.",
  },
};

export const useSignIn = () => {
  const [matchedError, setMatchedError] = useState<FormattedError>();
  return {
    ...useMutation({
      mutationFn: login,
      onError: (error) => {
        if (error instanceof AxiosError) {
          const resError = error?.response?.data;
          const keyError = resError?.error?.type as ErrorKeys;
          setMatchedError(matchError[keyError]);
        }
      },
      onSuccess: (data) => {
        memoryToken.refresh = data.token;
      },
    }),
    matchedError,
  };
};

export const useLogOut = () => {
  const setIsLogged = useAuthenticationStore((state) => state.setIsLogged);
  const resetSysErrors = useSystemErrorStore((state) => state.resetSysErrors);
  const quitSession = async () => {
    try {
      await client.fetchQuery({
        queryKey: [],
        queryFn: logout,
      });
      client.clear();
      setIsLogged(false);
      resetSysErrors();
    } catch (e) {
      // error
    }
  };
  return quitSession;
};
