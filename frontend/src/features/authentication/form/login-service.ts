import { axiosInstance } from "@/services";
import { UserInputs as User } from "./user-schema";

const login = async (user: User) => await axiosInstance.post("/sign-in", user);

export { login };
