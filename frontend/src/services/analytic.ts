import { stockdashInstance } from "@/services/stockdashService";
import {
  WeeklySales,
  WeeklyStatusProducts,
  GroupedProductsByCategory,
  SaleChart,
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
