import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { ExtendedFile, Status } from "@/types/extendedFiles";
import useErrorNotificationStore from "@/store/errorNotificationStore";
import {
  hasValidExtension,
  bytesToMB,
  formatFileSize,
} from "@/utils/fileUtils";

type UploadAreaState = {
  files: ExtendedFile[];
  error: string | null;
};

type UploadAreaActions = {
  appendFiles: (files: File[], limitFiles?: number) => void;
  removeFile: (id: string) => void;
  updateUploadProgress: (id: string, progress: number) => void;
  updateUploadStatus: (id: string, status: Status) => void;
  updateRefId: (id: string, refId: string) => void;
  addError: (message: string) => void;
  updateUploadValidation: (status: boolean) => void;
};

type UploadAreaMerge = UploadAreaState & UploadAreaActions;

type BoundedFiles = (files: File[], limit?: number) => File[];

const getBoundedFiles: BoundedFiles = (files, limit = 5) => {
  if (files.length > limit) return files.slice(0, limit);
  return files;
};

export const useUploadAreaStore = create<UploadAreaMerge>()((set) => ({
  files: [],
  error: null,
  addError: (message) =>
    set((state) => ({
      ...state,
      error: message,
    })),
  appendFiles: (files, limitFiles = 5) =>
    set((state) => {
      const errorMessages = {
        "max-files": `No se pueden añadir más archivos. Máximo permitido: ${limitFiles}`,
      };
      const setNotificationError =
        useErrorNotificationStore.getState().setError;
      const filesCount = state.files.length + files.length;

      if (filesCount > limitFiles) {
        setNotificationError(errorMessages["max-files"]);
        return state;
      }

      return state;
    }),
  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((file) => {
        return file.tempId !== id;
      }),
    })),
  updateUploadProgress: (id, uploadProgress) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, uploadProgress } : file
      ),
    })),
  updateUploadStatus: (id, uploadStatus) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, uploadStatus } : file
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
          : file
      ),
    })),
  updateUploadValidation: (status) =>
    set((state) => ({
      ...state,
    })),
}));
