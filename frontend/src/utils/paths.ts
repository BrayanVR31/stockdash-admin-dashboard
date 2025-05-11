type SiblingPathFn = (pathname: string, ...siblings: string[]) => string;
type PrevPathFn = (pathname: string, startPath: string) => string;

export const concatSiblingPaths: SiblingPathFn = (
  pathname,
  ...siblingPaths
) => {
  const splitPaths = pathname.split("/").filter((path) => path);
  if (!splitPaths || splitPaths.length === 0) return "";
  if (!siblingPaths || siblingPaths.length == 0) return splitPaths.pop() || "";
  const filteredPaths = splitPaths.filter((path) =>
    siblingPaths.includes(path),
  );
  return [...filteredPaths, splitPaths.pop()].join("/") || "";
};

export const getPrevPath: PrevPathFn = (pathname, startPath) => {
  if (!pathname) return "";
  const splitPaths = pathname.split("/").filter((path) => path);
  if (splitPaths.length <= 1) return "";
  const startIndex = splitPaths.indexOf(startPath);
  if (startIndex === -1 || startIndex === 0) return "";
  return splitPaths?.[startIndex - 1] || "";
};
