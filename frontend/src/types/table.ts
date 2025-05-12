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

export type HeadCol = AvatarCell | TextCell;
