import {
  useMutation,
  useQueries,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { UploadFile } from "@/types/extendedFiles";
import { stockdashInstance } from "@/services/stockdashService";
import { useUploadAreaStore } from "@/store/uploadAreaStore";
import { ExtendedFile } from "@/types/extendedFiles";
import { getUploadedFile, removeUploadedFile } from "@/services/upload";

export const useMultiUpload = () => {
  const setStatus = useUploadAreaStore((state) => state.setStatus);
  const setProgressValue = useUploadAreaStore(
    (state) => state.setProgressValue,
  );
  const setRefId = useUploadAreaStore((state) => state.setRefId);
  const recreateId = useUploadAreaStore((state) => state.recreateId);
  return useMutation({
    mutationFn: async (extFiles: ExtendedFile[]) => {
      const pendingExtFiles = extFiles.filter(
        ({ refId, status }) => !refId && status === "idle",
      );
      const filePromises = pendingExtFiles.map(async ({ tempId, file }) => {
        setStatus(tempId, "pending");
        const fileForm = new FormData();
        fileForm.append("image", file!);
        return stockdashInstance
          .post<UploadFile>("/upload-image", fileForm, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
              if (event.lengthComputable && event.total) {
                const { total, loaded } = event;
                setProgressValue(tempId, Math.round((loaded / total) * 100));
              }
            },
          })
          .then((response) => {
            setRefId(tempId, response.data._id);
            setStatus(tempId, "success");
          })
          .catch(() => {
            console.log("ops it was failed: ", tempId);
            setStatus(tempId, "error");
            setProgressValue(tempId, 0);
            recreateId(tempId);
          });
      });
      await Promise.all(filePromises);
    },
  });
};

export const useDestroyUpload = (tempId: string) => {
  const removeFile = useUploadAreaStore((state) => state.removeFile);
  return useMutation({
    onSuccess: () => {
      removeFile(tempId);
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: removeUploadedFile,
  });
};

/**
mutationFn: async (files: ExtendedFile[]) => {
  const pendingFiles = files.filter(({ refId }) => refId === undefined);
  console.log("mutation: ", pendingFiles);
  const uploadPromises = pendingFiles.map(async (file) => {
    if (file.status === "idle") {
      setStatus(file.tempId, "pending");
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
              setProgressValue(file.tempId, percentage);
            }
          },
        })
        .then((response) => {
          console.log("updating response...");
          setStatus(file.tempId, "success");
          setRefId(file.tempId, response.data._id);
        })
        .catch(() => {
          setStatus(file.tempId, "error");
        });
    }
    return Promise.resolve();
  });
  await Promise.all(uploadPromises);
},
*/

export const useRefreshUpload = () => {
  const files = useUploadAreaStore((state) => state.files);
  const setStatus = useUploadAreaStore((state) => state.setStatus);
  const setProgressValue = useUploadAreaStore(
    (state) => state.setProgressValue,
  );
  const setRefId = useUploadAreaStore((state) => state.setRefId);
  return useMutation({
    mutationFn: async (id: string) => {
      const pausedFile = files.find(({ tempId }) => tempId === id);
      if (pausedFile) {
        setStatus(pausedFile.tempId, "pending");
        const fileForm = new FormData();
        fileForm.append("image", pausedFile.file!);
        return stockdashInstance
          .post<UploadFile>("/upload-image", fileForm, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
              if (event.lengthComputable && event.total) {
                const { total, loaded } = event;
                setProgressValue(
                  pausedFile.tempId,
                  Math.round((loaded / total) * 100),
                );
              }
            },
          })
          .then((response) => {
            setRefId(pausedFile.tempId, response.data._id);
            setStatus(pausedFile.tempId, "success");
          })
          .catch((e) => {
            console.log(e);
            setStatus(pausedFile.tempId, "error");
            setProgressValue(pausedFile.tempId, 0);
          });
      }
      return Promise.resolve();
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

export const usePersistentFile = (id: string | undefined) => {
  return useSuspenseQuery({
    queryKey: ["file", id],
    queryFn: () => getUploadedFile(id || ""),
  });
};
