import { getUploadedFile, uploadSingleFile } from "@/services/upload";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const useUploadFile = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["account-avatar", id],
    queryFn: () => getUploadedFile(id),
  });
};

export const useAttachFile = () => {
  return useMutation({
    mutationFn: uploadSingleFile,
  });
};
