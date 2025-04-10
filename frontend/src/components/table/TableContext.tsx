import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useCallback,
} from "react";

export type Order = "asc" | "desc";

type Sorting = {
  colName: string;
  order: Order;
};

// Discriminated table type
type BasicTable = {
  withPagination: false;
  sorting: Sorting;
};

type PaginationActions = {
  updatePage: (page: number) => void;
  updatePerPage: (perPage: number) => void;
};

export type PaginationTable = {
  withPagination: true;
  paginating: {
    currentPage: number;
    perPage: number;
  };
  sorting: Sorting;
  updateColumnName: (columnName: string) => void;
  updateColumnOrder: (order: Order) => void;
} & PaginationActions;

type TableState = BasicTable | PaginationTable;
type TableActions = {
  updateColumnName: (columnName: string) => void;
  updateColumnOrder: (order: Order) => void;
};

// Merged state and actions
type TableCtx = TableState & TableActions;

export const TableContext = createContext<TableCtx>({
  withPagination: false,
  sorting: {
    colName: "",
    order: "desc",
  },
  updateColumnName: () => null,
  updateColumnOrder: () => null,
});

interface Props {
  children: ReactNode;
  withPagination?: boolean;
}

export const TableProvider = ({ children, withPagination = false }: Props) => {
  const [sorting, setSorting] = useState<Sorting>({
    colName: "",
    order: "asc",
  });
  const [paginating, setPaginating] = useState<PaginationTable["paginating"]>({
    currentPage: 1,
    perPage: 5,
  });

  // Use useCallback to memoize the update functions and use functional updates
  const updateColumnName = useCallback((name: string) => {
    console.log("Updating column name:", name);
    setSorting((prevState) => ({ ...prevState, colName: name }));
  }, []);

  const updateColumnOrder = useCallback((order: Order) => {
    console.log("Updating column order:", order);
    setSorting((prevState) => ({ ...prevState, order }));
  }, []);

  const updatePage = useCallback((currentPage: number) => {
    setPaginating((prevState) => ({ ...prevState, currentPage }));
  }, []);

  const updatePerPage = useCallback((perPage: number) => {
    setPaginating((prevState) => ({ ...prevState, perPage }));
  }, []);

  // Create value object with memoized functions
  const value: TableCtx = withPagination
    ? {
        withPagination,
        sorting,
        paginating,
        updatePage,
        updatePerPage,
        updateColumnName,
        updateColumnOrder,
      }
    : {
        withPagination,
        sorting,
        updateColumnName,
        updateColumnOrder,
      };

  console.log("TableProvider rendering with sorting:", sorting);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) throw new Error("useTable must be wrap into table provider.");
  return context;
};
