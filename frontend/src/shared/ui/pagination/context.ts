import { Dispatch, SetStateAction, createContext, useContext } from "react";

// Context
interface PaginationInt {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
}

const paginationContext = createContext<PaginationInt>({
  page: 1,
  setPage: () => null,
  perPage: 5,
  setPerPage: () => null,
});

export const PaginationProvider = paginationContext.Provider;

export function usePaginationCtx() {
  return useContext(paginationContext);
}
