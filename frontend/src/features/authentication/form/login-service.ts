import { axiosInstance } from "@/services";
import { UserInputs as User } from "./user-schema";

// Types
interface AuthRes {
  message: string;
  token: string;
  status: number;
}

const login = async (user: User) => {
  const response = await axiosInstance.post<AuthRes>("/sign-in", user);
  return response;
};

export { login };
