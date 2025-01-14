import { useMutation } from "@tanstack/react-query";
import { login } from "./login-service";
import { useLocalStorage } from "@/hooks";

function useAuth() {
  const { changeStorageValue } = useLocalStorage<string>("token");
  const authMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { token } = response;
      console.log({ token });
      changeStorageValue(token);
    },
  });

  return { authMutation };
}

export { useAuth };
