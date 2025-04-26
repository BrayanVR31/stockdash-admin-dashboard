import { useMutation, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { memoryToken } from "@/services/stockdashService";
import { login, logout } from "@/services/authentication";
import { useAuthenticationStore } from "@/store/authenticationStore";

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
        console.log(error);
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
  const queryClient = new QueryClient();
  const setIsLogged = useAuthenticationStore((state) => state.setIsLogged);

  const quitSession = async () => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: [],
        queryFn: logout,
      });
      console.log(data);
      setIsLogged(false);
    } catch (error) {
      console.log(error);
    }
  };
  return quitSession;
};
