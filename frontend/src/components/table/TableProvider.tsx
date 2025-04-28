import { ReactNode, useState, useEffect } from "react";
import { tableContext, TableCtx } from "./TableContext";

interface Props {
  children: ReactNode;
  pathKey: string;
}

export const TableProvider = ({ children, pathKey }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const value: TableCtx = {
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    selection,
    setSelection,
    pathKey,
  };
  return (
    <tableContext.Provider value={value}>{children}</tableContext.Provider>
  );
};
