import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { ExtendedFile, Status } from "@/types/extendedFiles";

type UploadAreaState = {
  files: ExtendedFile[];
};
type UploadAreaActions = {
  setFiles: (file: File[]) => void;
  setStatus: (id: string, status: Status) => void;
  setProgressValue: (id: string, value: number) => void;
  removeFile: (id: string) => void;
  setRefId: (tempId: string, id: string) => void;
  recreateId: (oldId: string) => void;
};
type UploadAreaStore = UploadAreaState & UploadAreaActions;

export const useUploadAreaStore = create<UploadAreaStore>()(
  persist(
    (set) => ({
      files: [],
      setFiles: (files) =>
        set((state) => {
          const uniqueFiles = [...files].filter(
            ({ name, size }) =>
              !state.files.some(
                ({ file }) => `${name}${size}` === `${file?.name}${file?.size}`,
              ),
          );
          return {
            ...state,
            files: [
              ...state.files,
              ...(uniqueFiles.map((file) => ({
                file,
                progressValue: 0,
                tempId: uuidv4(),
                status: "idle",
                refId: undefined,
              })) as ExtendedFile[]),
            ],
          };
        }),
      removeFile: (id) =>
        set((state) => ({
          ...state,
          files: state.files.filter(({ tempId }) => id !== tempId),
        })),
      setStatus: (id, status) =>
        set((state) => ({
          ...state,
          files: state.files.map((file) => ({
            ...file,
            status: id === file.tempId ? status : file.status,
          })),
        })),
      setProgressValue: (id, value) =>
        set((state) => ({
          ...state,
          files: state.files.map((file) => ({
            ...file,
            progressValue: id == file.tempId ? value : file.progressValue,
          })),
        })),
      setRefId: (tempId, refId) =>
        set((state) => ({
          ...state,
          files: state.files.map((file) => ({
            ...file,
            refId: file.tempId === tempId ? refId : file.refId,
          })),
        })),
      recreateId: (old) =>
        set((state) => ({
          ...state,
          files: state.files.map((file) => ({
            ...file,
            tempId: file.tempId === old ? uuidv4() : file.tempId,
          })),
        })),
    }),
    {
      name: "file-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        files: state.files
          .filter((file) => !!file.refId)
          .map((file) => file.refId),
      }),
      merge: (ps, cs) => {
        const persisted = ps as { files: (string | undefined)[] };
        const current: UploadAreaStore = cs;
        return {
          ...current,
          files: persisted.files.map((refId) => ({
            refId,
            status: "idle",
            tempId: uuidv4(),
            progressValue: 0,
            file: null,
          })),
        };
      },
    },
  ),
);
