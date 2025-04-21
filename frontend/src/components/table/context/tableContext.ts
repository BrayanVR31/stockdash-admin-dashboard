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
    pagination: {
      currentPage: 1,
      perPage: [5, 10, 25, 50],
      selectedPerPage: 5,
      totalItems: 5,
    },
  },
  dispatchConfig: () => null,
});

export default TableContext;
