import { CorsOptions } from "cors";

const { CLIENT_HOST, CLIENT_PORT } = process.env;
const { APP_HOST, APP_PORT } = process.env;

export const corsConfig: CorsOptions = {
  credentials: true,
  origin: [
    "https://4000-idx-stockdash-admin-dashboard-1746071726288.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev",
    "https://5173-idx-stockdash-admin-dashboard-1746071726288.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev",
  ],
};
