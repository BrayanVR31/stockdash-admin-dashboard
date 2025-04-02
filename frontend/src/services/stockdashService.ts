import axios from "axios";

const {
  VITE_API_URL: url,
  VITE_API_PORT: port,
  VITE_API_BASE_PATH: path,
} = import.meta.env;

export const memoryToken = {
  refresh: null as string | null,
};

export const stockdashInstance = axios.create({
  baseURL: `${url}:${port}/${path}`,
  withCredentials: true,
});
