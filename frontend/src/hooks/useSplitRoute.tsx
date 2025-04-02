import { useEffect, useState } from "react";
import { useLocation } from "react-router";

interface SplitState {
  splitted: string[];
  joined: string;
}

export const useSplitRoute = () => {
  const [splitPathRef, setSplitPathRef] = useState<SplitState>({
    splitted: [],
    joined: "",
  });
  const location = useLocation();
  useEffect(() => {
    const splitted = location.pathname
      .split("/")
      .filter((path) => path && path !== "dashboard");

    const joined = splitted.join("-");
    setSplitPathRef({ ...splitPathRef, splitted, joined });
  }, [location]);
  return splitPathRef;
};
