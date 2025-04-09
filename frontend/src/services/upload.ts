import { stockdashInstance } from "./stockdashService";

interface UploadFile {
  _id: string;
  path: string;
  extension: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

export const uploadSingleFile = async (fileForm: FormData) => {
  return (
    await stockdashInstance.post<UploadFile>("/upload-image", fileForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};
