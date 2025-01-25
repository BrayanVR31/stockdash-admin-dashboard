import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services";

/**
 * This hook get an user info and it stores on
 * web storage after that synchronize with global state
 */
function useProfile(refId: string) {
  const query = useQuery({
    queryFn: () => getUserProfile(refId),
    queryKey: ["profile"],
  });
  return { query };
}

export { useProfile };
