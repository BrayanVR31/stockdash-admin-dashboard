import _ from "lodash";

export const sortByColumn = <T>(
  data: T[],
  col: string,
  order: "asc" | "desc"
): T[] => {
  const invalidFields = data.filter((item) => {
    const path = _.get(item, col, null);
    return !!!path;
  });

  const validFields = data.filter((item) => {
    const path = _.get(item, col, null);
    return !!path;
  });
  return [
    ...validFields.sort((a, b) => {
      const pathA = _.get(a, col, "") as string;
      const pathB = _.get(b, col, "") as string;
      console.log({ pathA, pathB });
      if (pathA && pathB) {
        let codeA = 0;
        let codeB = 0;

        if (typeof pathA === "string" && typeof pathB === "string") {
          codeA = pathA.charCodeAt(0);
          codeB = pathB.charCodeAt(0);
        }
        if (
          !Number.isNaN(Date.parse(pathA)) &&
          !Number.isNaN(Date.parse(pathB))
        ) {
          codeA = new Date(pathA).getDate();
          codeB = new Date(pathB).getDate();
        }

        if (codeA < codeB) return order === "asc" ? -1 : 1;
        else if (codeA > codeB) return order === "asc" ? 1 : -1;
        return 0;
      }
      return 0;
    }),
    ...invalidFields,
  ];
};
