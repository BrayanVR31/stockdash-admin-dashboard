import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { ExtendedFile, Status } from "@/types/extendedFiles";

type UploadAreaState = {
  files: ExtendedFile[];
  error: string | null;
};

type UploadAreaActions = {
  appendFiles: (files: File[]) => void;
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
  appendFiles: (files) =>
    set((state) => {
      if (files.length > 5)
        return {
          ...state,
          error: "No se pueden añadir más archivos. Máximo permitido: 5",
        };
      const uniqueFiles: ExtendedFile[] = getBoundedFiles(files)
        .filter((file) => {
          const validExt = ["jpg", "jpeg", "png", "webp"];
          const extension = file.name.split(".").pop() || "";
          console.log({ extension, isValid: validExt.includes(extension) });
          const isUnique = state.files.some(
            (stateFile) =>
              `${stateFile.file.name}${stateFile.file.size}` ===
              `${file.name}${file.size}`,
          );
          return validExt.includes(extension) && !isUnique;
        })
        .map((file) => ({
          file,
          id: "",
          tempId: uuidv4(),
          uploadStatus: "idle",
          uploadProgress: 0,
        }));
      console.log("unique files: ", uniqueFiles);
      return {
        files: [...state.files, ...uniqueFiles],
      };
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
  updateUploadValidation: (status) =>
    set((state) => ({
      ...state,
    })),
}));
