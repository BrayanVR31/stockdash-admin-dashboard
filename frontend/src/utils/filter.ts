import _ from "lodash";
import { GenericObject, getDeepValueFromObj } from "@/utils/object";

export const filterList = <T>(
  list: T[],
  searchKeys: string[],
  keyword: string,
): T[] => {
  if (!keyword || !keyword.trim()) return list;

  const lowerKeyword = keyword.toLowerCase();

  return list.filter((item) => {
    return searchKeys.some((key) => {
      // Handle nested paths like "contact.email"
      const value = getDeepValueFromObj(item as GenericObject, key);

      // Handle different types of values
      if (value === null || value === undefined) {
        return false;
      }

      if (typeof value === "string" || typeof value === "number") {
        return String(value).toLowerCase().includes(lowerKeyword);
      }

      if (typeof value === "object") {
        // For objects, try to convert to string
        try {
          return JSON.stringify(value).toLowerCase().includes(lowerKeyword);
        } catch (e) {
          return false;
        }
      }

      return false;
    });
  });
};

interface FilterByColumnConfig {
  column: string;
  keyword: string;
}

const getNestedKeys = <T extends Record<string, any>>(
  obj: T,
  prefix = "",
): (keyof T | string)[] => {
  let keys: string[] = [];
  _.forOwn(obj, (value, key) => {
    // Append each key in first or deep level
    const completeKey = prefix ? `${prefix}.${key}` : key;
    keys.push(completeKey);

    // Use a recursive technique when it's a deep object
    if (_.isPlainObject(value)) {
      keys = keys.concat(
        getNestedKeys(
          value as Record<string, any>,
          completeKey,
        ) as unknown as string[],
      );
    }
  });
  return keys;
};

export const filterByColumn = <T extends Record<string, any>>(
  data: T[],
  { column, keyword }: FilterByColumnConfig,
) => {
  return data.filter((item) => {
    const col = _.get(item, column, null);
    const regex = new RegExp(keyword, "i");
    if (typeof col === "string") {
      return regex.test(col as string);
    } else if (typeof col === "object" && (col as unknown) instanceof Date) {
      const colDate = col as Date;
      const byYear = regex.test(colDate.getFullYear().toString());
      const byMonth = regex.test(colDate.getMonth().toString());
      const byDay = regex.test(colDate.getDay().toString());
      return byYear || byMonth || byDay;
    }
    return false;
  });
};

export const sortList = <T>(
  list: T[],
  col: string,
  order: "asc" | "desc",
): T[] => {
  if (!col || col === "") return list;

  console.log(`Sorting by ${col} in ${order} order`);

  try {
    return [...list].sort((a, b) => {
      // Extract values with dot notation support for nested properties
      let valueA: any = null;
      let valueB: any = null;

      try {
        valueA = getDeepValueFromObj(a as GenericObject, col);
        valueB = getDeepValueFromObj(b as GenericObject, col);
      } catch (error) {
        console.error("Error getting values for sorting:", error);
        return 0;
      }

      // Handle null or undefined values
      if (valueA === null || valueA === undefined)
        return order === "asc" ? -1 : 1;
      if (valueB === null || valueB === undefined)
        return order === "asc" ? 1 : -1;

      // Handle string comparisons
      if (typeof valueA === "string" && typeof valueB === "string") {
        return order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Handle number comparisons
      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }

      // Handle date comparisons
      if (valueA instanceof Date && valueB instanceof Date) {
        return order === "asc"
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      }

      // Default comparison for other types
      const strA = String(valueA || "");
      const strB = String(valueB || "");

      return order === "asc"
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
  } catch (error) {
    console.error("Error sorting list:", error);
    return list;
  }
};
