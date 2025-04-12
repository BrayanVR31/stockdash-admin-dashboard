import { useMutation, useQueries } from "@tanstack/react-query";
import { UploadFile } from "@/types/extendedFiles";
import { stockdashInstance } from "@/services/stockdashService";
import { useUploadAreaStore } from "@/store/uploadAreaStore";
import { ExtendedFile } from "@/types/extendedFiles";
import { getUploadedFile } from "@/services/upload";

export const useFileUpload = () => {
  const updateUploadProgress = useUploadAreaStore(
    (state) => state.updateUploadProgress,
  );
  const updateUploadStatus = useUploadAreaStore(
    (state) => state.updateUploadStatus,
  );
  const updateRefId = useUploadAreaStore((state) => state.updateRefId);
  const appendFiles = useUploadAreaStore((state) => state.appendFiles);
  return useMutation({
    onMutate: (variables) => {
      appendFiles(variables.map((file) => file.file));
    },
    mutationFn: async (files: ExtendedFile[]) => {
      const uploadPromises = files.map(async (file) => {
        if (file.uploadStatus === "idle") {
          updateUploadStatus(file.id, "pending");
          const formData = new FormData();
          formData.append("image", file.file);
          return stockdashInstance
            .post<UploadFile>("/upload-image", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (event) => {
                if (event.lengthComputable && event.total) {
                  const percentage = Math.round(
                    (event.loaded / event.total) * 100,
                  );
                  updateUploadProgress(file.id, percentage);
                }
              },
            })
            .then((response) => {
              updateRefId(file.id, response.data._id);
              updateUploadStatus(file.id, "success");
            })
            .catch(() => {
              updateUploadStatus(file.id, "error");
            });
        }
        return Promise.resolve();
      });
      await Promise.all(uploadPromises);
    },
  });
};

export const useStoredFile = (ids: string[], hasStoredFiles = false) => {
  return useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["file", id],
        queryFn: () => getUploadedFile(id),
        enabled: !!hasStoredFiles,
      };
    }),
  });
};
