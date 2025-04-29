import { Results, TimeStamps } from "./stockdash";

type Category = {
  name: string;
} & TimeStamps;

export type Categories = Results<Category>;
