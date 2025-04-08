import { useMutation } from "@tanstack/react-query";
import { uploadSingleFile } from "@/services/upload";

export const useUploadPicture = () => {
  return useMutation({
    mutationFn: uploadSingleFile,
    onError: (error) => console.log(error),
  });
};

export const useMultiUploadPicture = () => {};
