import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { settings, corsConfig } from "@/config";
import api from "@/routes/api";
import { authorization, handleError } from "@/middlewares";
const app = express();
const { server } = settings();
const publicPath = path.join(process.cwd(), "/public", "/assets", "/images");

// Express configurations
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.use("/public/images", express.static(publicPath));
app.use(api);
app.use(handleError);

export const startServer = () => {
  if (!server.hostname || !server.port)
    throw new Error("Error when the server was connecting on bootstrapping");
  app.listen(+server.port, server.hostname, () => {
    console.log(`Server is ready on: http://${server.hostname}:${server.port}`);
  });
};
