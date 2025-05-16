type HeaderCell = {
  title: string;
};

type AvatarCell = HeaderCell & {
  path: [image: string, text: string];
  type: "avatar";
};

type TextCell = HeaderCell & {
  path: string;
  type: "text";
};

type BadgeCell = HeaderCell & {
  path: string;
  type: "badge";
};

type ImagesCell = HeaderCell & {
  path: [image: string, text: string];
  type: "images";
};

type PriceCell = HeaderCell & {
  path: string;
  type: "price";
};

type StatusCell = HeaderCell & {
  path: string;
  type: "status";
};

type ImageGroupCell = HeaderCell & {
  path: {
    arrayPath: string;
  };
  type: "image-group";
};

type ImageStackCell = HeaderCell & {
  path: [arrayPath: string, nestedPath: string];
  type: "stack-image";
  nestedType: "single" | "multiple";
  alternativePath: string;
};

type SaleStatusCell = HeaderCell & {
  path: string;
  type: "sale-status";
};

type HumanDateCell = HeaderCell & {
  path: string;
  type: "human-date";
};

export type HeadCol =
  | AvatarCell
  | TextCell
  | BadgeCell
  | ImagesCell
  | PriceCell
  | StatusCell
  | ImageGroupCell
  | ImageStackCell
  | SaleStatusCell
  | HumanDateCell;

export const colSizes = {
  avatar: "0 0 20rem",
  text: "0 0 170px",
  badge: "0 0 14rem",
  images: "0 0 14rem",
  price: "0 0 125px",
  status: "0 0 100px",
  "stack-image": "0 0 16rem",
  "human-date": "0 0 14rem",
  "sale-status": "0 0 14rem",
};
