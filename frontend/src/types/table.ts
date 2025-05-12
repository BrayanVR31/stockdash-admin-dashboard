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

export type HeadCol =
  | AvatarCell
  | TextCell
  | BadgeCell
  | ImagesCell
  | PriceCell
  | StatusCell
  | ImageGroupCell;
