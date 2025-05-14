import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getWeeklySale,
  getWeeklyStatusProducts,
  getGroupedProductsByCategory,
  getSaleChartByYear,
} from "@/services/analytic";
import _ from "lodash";
import { TypeStatus, ChartStatus } from "@/types/analytic";

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

const getMonth = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const useSaleChartByYear = (year: number) => {
  return useSuspenseQuery({
    queryKey: ["chart-sale-year"],
    queryFn: () => getSaleChartByYear(year.toString()),
    select: (query) => {
      return query.map(({ month, statusCounts }) => {
        const statusArray = statusCounts.map(({ count, status }) => [
          status,
          count,
        ]);
        const statusObj = _.fromPairs(statusArray) as Omit<
          ChartStatus,
          "month"
        >;
        return {
          month: _.get(getMonth, month),
          ...statusObj,
        } as ChartStatus;
      });
    },
  });
};
