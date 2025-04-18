import { useContext } from "react";
import tableContext from "./tableContext";

export const useTable = () => {
  const context = useContext(tableContext);
  if (!context)
    throw new Error("useTable must be wrapped within a TableProvider");
  return context;
};
