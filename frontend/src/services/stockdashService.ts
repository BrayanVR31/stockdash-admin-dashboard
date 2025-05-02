import axios from "axios";

const { VITE_API_URL: url, VITE_API_BASE_PATH: path } = import.meta.env;

export const memoryToken = {
  refresh: null as string | null,
};

export const stockdashInstance = axios.create({
  baseURL: `${url}${path}`,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin":
      "https://5173-idx-stockdash-admin-dashboard-1746071726288.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev",
  },
});
