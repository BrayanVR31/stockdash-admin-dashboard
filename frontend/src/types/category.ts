import { Results, TimeStamps } from "./stockdash";

export type Category = {
  name: string;
} & TimeStamps;

export type Categories = Results<Category>;
