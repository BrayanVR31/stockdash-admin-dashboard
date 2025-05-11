import { useLocation } from "react-router";
import useSystemErrorStore from "@/store/systemErrorStore";
import { extractPaths } from "@/utils/paths";

export const useAppError = () => {
  const errors = useSystemErrorStore((state) => state.errors);
  const location = useLocation();
  const paths = extractPaths(location.pathname);
  const error = errors.find((e) => paths.includes(e.resource));
  return error;
};
