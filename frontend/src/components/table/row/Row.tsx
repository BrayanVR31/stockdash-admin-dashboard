import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Row = ({ children }: Props) => (
  <tr className="flex">{children}</tr>
);
