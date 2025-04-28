import { stockdashInstance } from "./stockdashService";

export interface UploadFile {
  _id: string;
  path: string;
  extension: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UploadStatus = "idle" | "error" | "success" | "pending";

export const uploadSingleFile = async (fileForm: FormData) => {
  return (
    await stockdashInstance.post<UploadFile>("/upload", fileForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};

export const getUploadedFile = async (id: string) => {
  return (await stockdashInstance.get<UploadFile>(`/upload-image/${id}`)).data;
};

export const removeUploadedFile = async (id: string) => {
  return (await stockdashInstance.delete(`/upload-image/${id}`)).data;
};
