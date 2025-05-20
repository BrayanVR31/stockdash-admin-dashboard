import { CorsOptions } from "cors";

const allowedDomains = [
  "http://localhost:5173",
  "http://192.168.100.17:5173"
];

export const corsConfig: CorsOptions = {
  origin: function (origin, cb) {
    if (allowedDomains.indexOf(origin) !== -1 || !origin) {
      cb(null, true)
    } else {
      cb(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
};
