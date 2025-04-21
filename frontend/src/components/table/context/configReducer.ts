import { produce } from "immer";

type Order = "asc" | "desc";

export interface ConfigState {
  sorting: {
    path: string /** Which field needs to be sorted */;
    order: Order;
  };
  pagination: {
    currentPage: number;
    selectedPerPage: number;
    perPage: number[];
    totalItems: number;
  };
}

type ActionType =
  | "update-sort-path"
  | "update-sort-order"
  | "update-selected-per-page"
  | "update-total-items"
  | "update-current-page"
  | "update-next-page"
  | "update-prev-page";

type Payload = Partial<ConfigState["sorting"] & ConfigState["pagination"]>;

export interface ConfigAction {
  payload?: Payload;
  type: ActionType;
}

export const initialConfig: ConfigState = {
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
    case "update-selected-per-page":
      return produce(state, (draftState) => {
        if (action.payload?.selectedPerPage) {
          draftState.pagination.selectedPerPage =
            action.payload.selectedPerPage;
          draftState.pagination.currentPage = 1;
        }
      });
    case "update-total-items":
      return produce(state, (draftState) => {
        if (action.payload?.totalItems)
          draftState.pagination.totalItems = action.payload.totalItems;
      });
    case "update-current-page":
      return produce(state, (draftState) => {
        if (action.payload?.currentPage)
          draftState.pagination.currentPage = action.payload.currentPage;
      });
    case "update-next-page":
      return produce(state, (draftState) => {
        const { pagination } = state;
        if (pagination.currentPage < pagination.totalItems) {
          draftState.pagination.currentPage = pagination.currentPage + 1;
        }
      });
    case "update-prev-page":
      return produce(state, (draftState) => {
        const { pagination } = state;
        if (pagination.currentPage > 1) {
          draftState.pagination.currentPage = pagination.currentPage - 1;
        }
      });
  }
};

export default configReducer;
