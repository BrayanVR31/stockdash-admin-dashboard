import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Cell = ({ children }: Props) => {
  return <td className="flex-1 truncate self-center">{children}</td>;
};

export { Cell };
