import { GenericObject } from "@/components/table/object";
import { getDeepValueFromObj } from "@/components/table/object";

export const filterList = <T>(
  list: T[],
  searchKeys: string[],
  keyword: string
): T[] => {
  if (!keyword.trim()) return list;

  const lowerKeyword = keyword.toLowerCase();

  return list.filter((item) => {
    return searchKeys.some((key) => {
      // Handle nested paths like "contact.email"
      const value = getDeepValueFromObj(item as GenericObject, key);
      console.log(`Searching key: ${key}, Value:`, value);

      // Handle different types of values
      if (value === null || value === undefined) {
        return false;
      }

      if (typeof value === "string" || typeof value === "number") {
        const matches = String(value).toLowerCase().includes(lowerKeyword);
        if (matches) {
          console.log(`Match found in key: ${key}, Value:`, value);
        }
        return matches;
      }

      if (typeof value === "object") {
        // For objects, try to convert to string
        try {
          const matches = JSON.stringify(value)
            .toLowerCase()
            .includes(lowerKeyword);
          if (matches) {
            console.log(`Match found in object key: ${key}, Value:`, value);
          }
          return matches;
        } catch (e) {
          return false;
        }
      }

      return false;
    });
  });
};
