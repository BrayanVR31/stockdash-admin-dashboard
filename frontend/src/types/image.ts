import { Results, TimeStamps } from "./stockdash";

type Image = {
  path: string;
  extension: string;
  size: number;
  refId: string;
} & TimeStamps;

export type Images = Results<Image>;
