import { axiosInstance } from "./axios";

export const uploadImage = async (form: FormData) => {
  const response = await axiosInstance.post("/upload-image", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const removeImage = async (id: string) => {
  await axiosInstance.delete(`/upload-image/${id}`);
};
