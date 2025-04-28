import { useContext } from "react";
import { tableContext } from "./TableContext";

export const useTable = () => {
  const context = useContext(tableContext);
  if (!context)
    throw new Error("Table context must be wrapped into TableProvider.");
  return context;
};
