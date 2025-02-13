import { createContext, ReactNode, useState, useContext } from "react";

interface PaginationCtxState {
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;
}

interface Pagination {
  perPage: number;
  page: number;
}

const initialCtxState: PaginationCtxState = {
  pagination: {
    page: 1,
    perPage: 5,
  },
  setPagination: () => null,
};

const PaginationCtx = createContext<PaginationCtxState>(initialCtxState);

interface Props {
  children: ReactNode;
  defaultPage: number;
  defaultPerPage: number;
}

export const PaginationProvider = ({
  children,
  defaultPage,
  defaultPerPage,
}: Props) => {
  const [pagination, setPagination] = useState<Pagination>({
    page: defaultPage,
    perPage: defaultPerPage,
  });
  const value = {
    pagination,
    setPagination,
  };
  return (
    <PaginationCtx.Provider value={value}>{children}</PaginationCtx.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationCtx);
  return context;
};
