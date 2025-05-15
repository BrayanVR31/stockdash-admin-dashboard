import { create } from "zustand";

type SaleAnalyticState = {
  saleYear: number;
};

type SaleAnalyticActions = {
  setSaleYear: (year: number) => void;
};

type SaleAnalyticStore = SaleAnalyticState & SaleAnalyticActions;

const useSaleAnalyticStore = create<SaleAnalyticStore>()((set) => ({
  saleYear: 2025,
  setSaleYear: (year) =>
    set((state) => ({
      ...state,
      saleYear: year,
    })),
}));

export default useSaleAnalyticStore;
