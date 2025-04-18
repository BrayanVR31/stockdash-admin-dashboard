import { createContext, Dispatch } from "react";
import { ConfigState, ConfigAction } from "./configReducer";

export interface TableCtx {
  config: ConfigState;
  dispatchConfig: Dispatch<ConfigAction>;
}

const TableContext = createContext<TableCtx>({
  config: {
    sorting: {
      order: "asc",
      path: "",
    },
  },
  dispatchConfig: () => null,
});

export default TableContext;
