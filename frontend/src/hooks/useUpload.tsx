import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getUploadedFile,
  uploadSingleFile,
  UploadFile,
  UploadStatus,
} from "@/services/upload";
import { stockdashInstance } from "@/services/stockdashService";

export const useUploadFile = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["account-avatar", id],
    queryFn: () => getUploadedFile(id),
  });
};

export const useAttachFile = () => {
  const [attachProgress, setAttachProgress] = useState<{
    value: number;
    status: UploadStatus;
  }>({
    value: 0,
    status: "idle",
  });
  return {
    ...useMutation({
      mutationFn: async (fileForm: FormData) => {
        return (
          await stockdashInstance.post<UploadFile>("/upload", fileForm, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
              if (event.lengthComputable && event.total) {
                const { total, loaded } = event;
                setAttachProgress({
                  value: Math.round((loaded / total) * 100),
                  status: "pending",
                });
              }
            },
          })
        ).data;
      },
      onSuccess: () => {
        setAttachProgress({ ...attachProgress, status: "success" });
      },
    }),
    attachProgress,
  };
};
