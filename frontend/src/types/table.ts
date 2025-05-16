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
