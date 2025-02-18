import { useEffect, useState } from "react";
import { axiosInstance } from "@/services/axios";

interface SingleFile {
  _id: string;
  size: number;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

const useAttachFile = (nameField: string) => {
  const [attachedFile, setAttachedFile] = useState<SingleFile | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [attachedProgress, setAttachedProgress] = useState(0);

  useEffect(() => {
    if (!file) return;
    const formData = new FormData();
    formData.append(nameField, file);
    console.log(file);
    // Uploading file on web server
    axiosInstance
      .post<SingleFile>("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.progress) {
            setAttachedProgress(Math.round(event.progress * 100));
          }
        },
      })
      .then((response) => {
        console.log("data: ", response.data);
        setAttachedFile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [file]);
  return { attachedFile, file, setFile, attachedProgress };
};

export { useAttachFile };
