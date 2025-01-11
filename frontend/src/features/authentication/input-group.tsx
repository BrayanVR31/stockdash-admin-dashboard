import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function InputGroup({ children }: Props) {
  return <div className="flex flex-col-reverse gap-y-4 mb-8">{children}</div>;
}

export { InputGroup };
