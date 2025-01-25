import { useMutation } from "@tanstack/react-query";
import { useLocalStore } from "@/hooks";
import { login } from "./login-service";

function useAuth() {
  const { setValue: setToken } = useLocalStore<string>({
    key: "token",
    isEncripted: true,
  });
  const authMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response?.data?.token || null);
    },
    onError: () => {
      setToken(null);
    },
  });
  return { authMutation };
}

export { useAuth };
