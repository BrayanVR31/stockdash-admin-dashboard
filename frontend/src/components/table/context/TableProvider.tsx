import { ReactNode, useReducer } from "react";
import configReducer, { initialConfig } from "./configReducer";
import TableContext, { TableCtx } from "./tableContext";

interface Props {
  children: ReactNode;
  rowsPerPage?: number[];
}

export const TableProvider = ({
  children,
  rowsPerPage = [5, 10, 25, 50],
}: Props) => {
  const [config, dispatchConfig] = useReducer(configReducer, {
    ...initialConfig,
    pagination: {
      ...initialConfig.pagination,
      perPage: rowsPerPage,
    },
  });

  const value: TableCtx = {
    config,
    dispatchConfig,
  };
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};
