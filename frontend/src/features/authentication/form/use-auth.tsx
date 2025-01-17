import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@/hooks";
import { login } from "./login-service";

function useAuth() {
  const { changeStorageValue: setToken } = useLocalStorage<string>("token");
  const authMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("success", response?.data?.token);
      //setToken(token as string);
    },
    onError: () => {
      console.log("login error");
    },
  });
  return { authMutation };
}

export { useAuth };
