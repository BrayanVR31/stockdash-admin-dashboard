import { describe, it, expect } from "vitest";
import { createRandSupplier } from "@/utils/fakerData";
import { filterByColumn } from "@/utils/filter/filter";

describe("Filter search on list of data", () => {
  const supplierList = Array.from({ length: 30 }, () =>
    createRandSupplier(true)
  );
  it("should return all coincidences starts 'Axi' on name field", () => {
    const coincidences = filterByColumn(supplierList, {
      column: "name",
      keyword: "axi",
    });
    const expectedList = supplierList.filter((item) =>
      item.name.startsWith("Axi")
    );
    expect(coincidences.length).toBe(expectedList.length);
    expect(coincidences).toEqual(expectedList);
  });
  it("should return all coincidences when 'ony' word is located in any index string location, using name field", () => {
    const coincidences = filterByColumn(supplierList, {
      column: "name",
      keyword: "ony",
    });

    const searchReg = new RegExp("ony", "i");
    const expectedList = supplierList.filter((item) =>
      searchReg.test(item.name)
    );
    expect(coincidences.length).toBe(expectedList.length);
    expect(coincidences).toEqual(expectedList);
  });
  it("should return all coincidences when 'bal' word is macthed to end of string with name field", () => {
    const expectedList = supplierList.filter((item) =>
      item.name.endsWith("bal")
    );
    const filteredList = filterByColumn(supplierList, {
      column: "name",
      keyword: "bal",
    });
    expect(filteredList.length).toBe(expectedList.length);
    expect(filteredList).toEqual(expectedList);
  });
  it("should return all coincidences when '22' 'phoneNumber' col is matched", () => {
    const regex = /22/i;
    const expectedList = supplierList.filter((item) =>
      regex.test(item.contact.phoneNumber)
    );
    const filteredList = filterByColumn(supplierList, {
      column: "contact.phoneNumber",
      keyword: "22",
    });
    expect(filteredList.length).toBe(expectedList.length);
    expect(filteredList).toEqual(expectedList);
  });
  it("should return all coincidences matched in '2025' createdAt col", () => {
    const expectedList = supplierList.filter(
      (item) => item.createdAt.getFullYear() === 2025
    );
    const filteredList = filterByColumn(supplierList, {
      column: "createdAt",
      keyword: "2025",
    });
    expect(filteredList.length).toBe(expectedList.length);
  });
});
