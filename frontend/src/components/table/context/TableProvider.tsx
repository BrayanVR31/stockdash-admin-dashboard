import { ReactNode, useReducer } from "react";
import configReducer, { initialConfig } from "./configReducer";
import TableContext, { TableCtx } from "./tableContext";

interface Props {
  children: ReactNode;
}

export const TableProvider = ({ children }: Props) => {
  const [config, dispatchConfig] = useReducer(configReducer, initialConfig);
  const value: TableCtx = {
    config,
    dispatchConfig,
  };
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};
