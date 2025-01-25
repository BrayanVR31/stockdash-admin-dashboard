import { ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocalStore, useProfile } from "@/hooks";
import { TokenPayload } from "@/models";
import { useProfileStore } from "@/store";

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
    <div className="bg-neutral-300/50 min-h-svh">
      <h2 className="text-5xl font-semibold mb-5">Main base template</h2>
      {query.isSuccess && JSON.stringify(profile)}
      {children}
    </div>
  );
}

export { Layout };
