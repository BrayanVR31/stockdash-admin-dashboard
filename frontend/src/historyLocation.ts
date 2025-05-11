let currentPath = "/";

export const getLocation = {
  setPath: (path: string) => (currentPath = path),
  getPath: () => currentPath,
};
