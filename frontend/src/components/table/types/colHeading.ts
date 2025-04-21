import { JSX } from "react";

export type ColHeading = {
  path: string /** Object key to render each column data */;
  content: JSX.Element;
  type?: "image" | "text";
  hasFilter?: boolean;
};
