import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AxiosError } from "axios";
import { memoryToken } from "@/services/stockdashService";
import { login, logout } from "@/services/authentication";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { getQueryClient } from "@/QueryClient";
import useSystemErrorStore from "@/store/systemErrorStore";

const client = getQueryClient();

export const useSignIn = () => {
  const resetSysErrors = useSystemErrorStore((state) => state.resetSysErrors);
  return {
    ...useMutation({
      mutationFn: login,
      onSuccess: (data) => {
        memoryToken.refresh = data.token;
        resetSysErrors();
      },
    }),
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
