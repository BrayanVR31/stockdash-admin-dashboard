import { useLocalStore } from "@/hooks";
import { LoginPage } from "@/features/authentication";

function AuthRoute() {
  const { value: token } = useLocalStore<string>({
    key: "token",
    isEncripted: true,
  });
  console.log({ token });
  return <LoginPage />;
}

export { AuthRoute };
