import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getWeeklySale,
  getWeeklyStatusProducts,
  getGroupedProductsByCategory,
} from "@/services/analytic";

export const useWeeklySales = () => {
  return useSuspenseQuery({
    queryKey: ["weekly-sales"],
    queryFn: getWeeklySale,
    select: (query) =>
      query.map((data) => ({
        value: data.count,
      })),
  });
};

export const useWeeklyStatusProducts = () => {
  return useSuspenseQuery({
    queryKey: ["weekly-status-products"],
    queryFn: getWeeklyStatusProducts,
  });
};

export const useGroupedProductsByCategory = () => {
  const colors = ["blue.solid", "orange.solid", "pink.solid", "green.solid"];
  return useSuspenseQuery({
    queryKey: ["grouped-products-category"],
    queryFn: getGroupedProductsByCategory,
    select: (query) =>
      query.map((data) => ({
        value: data.count,
        name: data.category,
        color: colors[Math.ceil(Math.random() * colors.length - 1)],
      })),
  });
};
