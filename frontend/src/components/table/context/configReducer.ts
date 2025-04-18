import { produce } from "immer";

type Order = "asc" | "desc";

export interface ConfigState {
  sorting: {
    path: string /** Which field needs to be sorted */;
    order: Order;
  };
}

type ActionType = "update-sort-path" | "update-sort-order";
type Payload = Partial<ConfigState["sorting"]>;

export interface ConfigAction {
  payload?: Payload;
  type: ActionType;
}

export const initialConfig: ConfigState = {
  sorting: {
    order: "asc",
    path: "",
  },
};

const configReducer = (
  state: ConfigState,
  action: ConfigAction,
): ConfigState => {
  switch (action.type) {
    case "update-sort-order":
      return produce(state, (draftState) => {
        if (action.payload?.order)
          draftState.sorting.order = action.payload.order;
      });
    case "update-sort-path":
      return produce(state, (draftState) => {
        if (action.payload?.path) draftState.sorting.path = action.payload.path;
      });
  }
};

export default configReducer;
