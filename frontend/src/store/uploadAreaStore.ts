import { create } from "zustand";
import { ExtendedFile, Status } from "@/types/extendedFiles";

type UploadAreaState = {
  files: ExtendedFile[];
};

type UploadAreaActions = {
  appendFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  updateUploadProgress: (id: string, progress: number) => void;
  updateUploadStatus: (id: string, status: Status) => void;
  updateRefId: (id: string, refId: string) => void;
};

type UploadAreaMerge = UploadAreaState & UploadAreaActions;

export const useUploadAreaStore = create<UploadAreaMerge>()((set) => ({
  files: [],
  appendFiles: (files) =>
    set((state) => {
      const uniqueFiles: ExtendedFile[] = files
        .filter((file) => {
          const isUnique = state.files.some(
            (stateFile) => stateFile.id === `${file.name}${file.size}`,
          );
          return !isUnique;
        })
        .map((file) => ({
          file,
          id: `${file.name}${file.size}`,
          uploadStatus: "idle",
          uploadProgress: 0,
        }));
      return {
        files: [...state.files, ...uniqueFiles],
      };
    }),
  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
    })),
  updateUploadProgress: (id, uploadProgress) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, uploadProgress } : file,
      ),
    })),
  updateUploadStatus: (id, uploadStatus) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, uploadStatus } : file,
      ),
    })),
  updateRefId: (id, refId) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id
          ? {
              ...file,
              refId,
            }
          : file,
      ),
    })),
}));
