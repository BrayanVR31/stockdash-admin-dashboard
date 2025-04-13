import { bytesToMB } from "./fileUtils";

interface ValidationError {
  fileId: string;
  fileName: string;
  error: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateFiles = (
  files: File[],
  fileIds: string[],
  maxSize: number,
  allowedExtensions: string[]
): ValidationResult => {
  const errors: ValidationError[] = [];

  files.forEach((file, index) => {
    const fileId = fileIds[index];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    // Check file size
    const fileSizeInMB = bytesToMB(file.size);
    if (fileSizeInMB > maxSize) {
      errors.push({
        fileId,
        fileName: file.name,
        error: `File size exceeds the maximum allowed size of ${maxSize}MB`,
      });
    }

    // Check file extension
    if (fileExtension && !allowedExtensions.includes(fileExtension)) {
      errors.push({
        fileId,
        fileName: file.name,
        error: `File type not allowed. Allowed types: ${allowedExtensions.join(
          ", "
        )}`,
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
