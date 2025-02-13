import { useMutation } from "@tanstack/react-query";
import { useTokenStore } from "@/store";
import { login } from "./login-service";

function useAuth() {
  const updateToken = useTokenStore((state) => state.setToken);
  const authMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log(response);
      updateToken(response?.data?.token || "");
    },
    onError: () => {
      //
    },
  });
  return { authMutation };
}

export { useAuth };
