export type WeeklySales = {
  _id: Date;
  count: number;
};

type ProductsByWeek = {
  date: string;
  value: number;
};

export type WeeklyStatusProducts = {
  active: {
    count: number;
    productsByWeek: ProductsByWeek[];
  };
  inactive: {
    count: number;
    productsByWeek: ProductsByWeek[];
  };
};

export type GroupedProductsByCategory = {
  count: number;
  category: string;
};

export type TypeStatus = "canceled" | "pending" | "completed";

type StatusCount = {
  status: TypeStatus;
  count: number;
};

export type ChartStatus = {
  completed: number;
  canceled: number;
  pending: number;
  month: string;
};

export type SaleChart = {
  totalSales: number;
  statusCounts: StatusCount[];
  month: number;
};

export type GroupProductByCategory = {
  _id: string;
  totalProducts: number;
  average: number;
};

type PriceHistory = {
  totalPriceByYear: number;
  purchaseYear: number;
};

export type PurchasePriceHistory = {
  allPurchasePrice: number;
  history: PriceHistory[];
};

type Count = {
  allCount: number;
  activeCount?: number;
};
export type OverviewCount = Record<string, Count>;
