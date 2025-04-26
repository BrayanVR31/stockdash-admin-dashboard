import { RouteObject } from "react-router";
import Layout from "@/layouts/Login/Layout";

const publicRoute: RouteObject = {
  path: "/login",
  element: <Layout />,
};

export default publicRoute;
