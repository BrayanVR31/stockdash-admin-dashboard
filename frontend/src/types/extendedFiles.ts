export type Status = "idle" | "pending" | "error" | "success";

export interface ExtendedFile {
  id: string;
  file: File;
  uploadProgress: number;
  uploadStatus: Status;
  tempId: string;
  isValid: boolean;
}

export interface UploadFile {
  _id: string;
  path: string;
  extension: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}
