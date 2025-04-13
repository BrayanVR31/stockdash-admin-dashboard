/**
 * Utility functions for file operations
 */
export const hasValidExtension = (
  fileName: string,
  ...extensions: string[]
): boolean => {
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
  return extensions.map((ext) => ext.toLowerCase()).includes(fileExtension);
};

/**
 * Converts bytes to megabytes
 */
export const bytesToMB = (bytes: number): number => {
  return bytes / 1024 / 1024;
};

/**
 * Formats a file size to a human-readable string
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
