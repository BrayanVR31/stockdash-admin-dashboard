import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import api from "@routes/api";
import { authorization, handleError } from "@middlewares";
const app = express();
const { APP_HOST: hostname, APP_PORT: port } = process.env;

// Express configurations
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(api);
app.get(
  "*",
  authorization.verifyAccess as express.RequestHandler,
  function (request, response) {
    response.json({
      message: "Express server is ready and you can get started",
    });
  },
);
app.use(handleError);

export const startServer = () => {
  if (!hostname || !port)
    throw new Error("Error when the server was connecting on bootstrapping");
  app.listen(+port, hostname, () => {
    console.log(`Server is ready on 🚀: http://${hostname}:${port}`);
  });
};
