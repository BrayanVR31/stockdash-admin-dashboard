import { createContext, SetStateAction, Dispatch } from "react";

interface TableState {
  currentPage: number;
  perPage: number;
  selection: Set<string>;
  pathKey: string;
  totalItems: number;
}

interface TableActions {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
  setSelection: Dispatch<SetStateAction<Set<string>>>;
  setTotalItems: Dispatch<SetStateAction<number>>;
}

export type TableCtx = TableState & TableActions;

export const tableContext = createContext<TableCtx>({
  currentPage: 1,
  perPage: 5,
  setCurrentPage: () => null,
  setPerPage: () => null,
  selection: new Set(),
  setSelection: () => null,
  pathKey: "",
  setTotalItems: () => null,
  totalItems: 0,
});
