import axios from "axios";
import { DataResponse, Category } from "@types";

// types
type CategoryRes = DataResponse<Category>;

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

// Get all data
export const getList = async () =>
  (await axiosInstance.get<CategoryRes>("/categories")).data;
