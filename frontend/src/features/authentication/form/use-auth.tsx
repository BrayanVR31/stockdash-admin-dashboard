import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@/hooks";
import { login } from "./login-service";

function useAuth() {
  const { changeStorageValue: setToken } = useLocalStorage<string>("token");
  const authMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { token } = response;
      setToken(token);
      console.log({ token });
    },
  });
  return { authMutation };
}

export { useAuth };
