import { stockdashInstance } from "@/services/stockdashService";
import {
  WeeklySales,
  WeeklyStatusProducts,
  GroupedProductsByCategory,
  SaleChart,
  GroupProductByCategory,
  PurchasePriceHistory,
  OverviewCount,
} from "@/types/analytic";

export const getWeeklySale = async () => {
  return (await stockdashInstance.get<WeeklySales[]>("/analytics/weekly-sales"))
    .data;
};

export const getWeeklyStatusProducts = async () => {
  return (
    await stockdashInstance.get<WeeklyStatusProducts>(
      "/analytics/weekly-status-products",
    )
  ).data;
};

export const getGroupedProductsByCategory = async () => {
  return (
    await stockdashInstance.get<GroupedProductsByCategory[]>(
      "/analytics/group-products-by-category",
    )
  ).data;
};

export const getSaleChartByYear = async (year: string) => {
  return (
    await stockdashInstance.get<SaleChart[]>(
      `/analytics/sale-chart-by-year?year=${year}`,
    )
  ).data;
};

export const getSalesYear = async () => {
  return (
    await stockdashInstance.get<{ year: number }[]>(`/analytics/sale-years`)
  ).data;
};

export const getGroupProductsByCategory = async () => {
  return (
    await stockdashInstance.get<GroupProductByCategory[]>(
      `/analytics/all-products-group-category`,
    )
  ).data;
};

export const getPurchasePriceHistory = async () => {
  return (
    await stockdashInstance.get<PurchasePriceHistory>(
      `/analytics/annual-purchases`,
    )
  ).data;
};

export const getOverviewCount = async () => {
  return (
    await stockdashInstance.get<OverviewCount>(`/analytics/count-overview`)
  ).data;
};
