import { ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocalStore, useProfile } from "@/hooks";
import { TokenPayload } from "@/models";
import { useProfileStore } from "@/store";
import { Navbar } from "@/components/ui/dashboard-navbar";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  const { value: token } = useLocalStore<string>({
    key: "token",
    isEncripted: true,
  });
  const { id } = jwtDecode<TokenPayload>(token!);
  const { query } = useProfile(id);
  console.log({ token, id });
  console.log(query.data);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const profile = useProfileStore((state) => state.userProfile);
  useEffect(() => {
    if (query.isSuccess) updateProfile(query.data);
  }, [query.isSuccess]);
  return (
    <div className="bg-neutral-800/75 w-full grid grid-rows-[81px_minmax(calc(100vh-81px),1fr)]">
      <Navbar />
      <div className="w-full">
        <div className="w-[95%] mx-auto">{children}</div>
      </div>
    </div>
  );
}

export { Layout };
