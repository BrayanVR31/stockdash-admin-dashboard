import axios from "axios";

const {
  VITE_API_URL: url,
  VITE_API_PORT: port,
  VITE_API_BASE_PATH: path,
} = import.meta.env;

const axiosInstance = axios.create({
  baseURL: `${url}:${port}/${path}`,
  withCredentials: true,
});

export { axiosInstance };
