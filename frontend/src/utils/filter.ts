import { getDeepValueFromObj, GenericObject } from "./object";

export const filterList = <T>(
  list: T[],
  searchKeys: string[],
  keyword: string,
): T[] => {
  const lowerKeyword = keyword.toLowerCase();
  return list.filter((item) =>
    searchKeys.some((key) => {
      const value = getDeepValueFromObj(item as GenericObject, key as string);
      if (typeof value === "string" || typeof value === "number") {
        return (value as string)
          .toString()
          .toLowerCase()
          .includes(lowerKeyword);
      }

      return false;
    }),
  );
  /*
  return list.filter((item) => {
    const foundValue = getDeepValueFromObj(item);
    return JSON.stringify(foundValue) === keyword;
  });
  */
};
