import axios from "axios";
import { UserInputs } from "../types";
const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

// Get access on system authentication
export const login = async (user: UserInputs) =>
  await instance.post<UserInputs>("/sign-in", user);
