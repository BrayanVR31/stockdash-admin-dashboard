import { stockdashInstance } from "@/services/stockdashService";
import {
  WeeklySales,
  WeeklyStatusProducts,
  GroupedProductsByCategory,
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
