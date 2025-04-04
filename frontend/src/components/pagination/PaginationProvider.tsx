import {
  SetStateAction,
  Dispatch,
  createContext,
  ReactNode,
  useState,
  useContext,
} from "react";

interface PaginationState {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const paginationCtx = createContext<PaginationState>({
  currentPage: 0,
  setCurrentPage: () => null,
});

interface Props {
  children: ReactNode;
}

export const PaginationProvider = ({ children }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const value: PaginationState = {
    currentPage,
    setCurrentPage,
  };
  return (
    <paginationCtx.Provider value={value}>{children}</paginationCtx.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(paginationCtx);
  if (!context)
    throw new Error(
      "Pagination context must be wrapped into pagination provider",
    );
  return context;
};
