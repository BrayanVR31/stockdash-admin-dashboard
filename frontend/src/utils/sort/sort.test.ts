import { describe, it, expect } from "vitest";
import { createRandSupplier } from "@/utils/fakerData";
import { sortByColumn } from "./sort";

describe("Sorting of data list", () => {
  const dataList = Array.from({ length: 10 }, () => createRandSupplier(true));
  it("should sort a list of data in 'name' column from A-Z", () => {
    const sortedList = [...dataList].sort((a, b) => {
      const codeA = a.name.charCodeAt(0);
      const codeB = b.name.charCodeAt(0);
      if (codeA < codeB) return -1;
      else if (codeA > codeB) return 1;
      return 0;
    });
    const sortedByCol = sortByColumn(dataList, "name", "asc");
    expect(sortedByCol).toEqual(sortedList);
    expect(sortedByCol.length).toBe(sortedList.length);
  });
  it("should sort a list of data in 'name' column from Z-A", () => {
    const sortedList = [...dataList].sort((a, b) => {
      const codeA = a.name.charCodeAt(0);
      const codeB = b.name.charCodeAt(0);
      if (codeA > codeB) return -1;
      else if (codeA < codeB) return 1;
      return 0;
    });
    const sortedByCol = sortByColumn(dataList, "name", "desc");
    expect(sortedByCol).toEqual(sortedList);
    expect(sortedByCol.length).toBe(sortedList.length);
  });
});
