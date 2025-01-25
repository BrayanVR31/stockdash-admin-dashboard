import { axiosInstance } from "./axios";
import { UserProfile } from "@/models";

const getUserProfile = async (id: string) => {
  return (await axiosInstance.get<UserProfile>(`/profile/${id}`)).data;
};

export { getUserProfile };
