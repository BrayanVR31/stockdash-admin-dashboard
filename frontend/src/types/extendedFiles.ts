export type Status = "idle" | "pending" | "error" | "success";

export interface ExtendedFile {
  file: File | null;
  tempId: string;
  progressValue: number;
  status: Status;
  refId?: UploadFile["_id"];
}

export interface UploadFile {
  _id: string;
  path: string;
  extension: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}
