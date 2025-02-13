import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

function Header({ title, children }: Props) {
  return (
    <div className="flex min-h-[70px] items-center justify-between">
      <div>
        <h2 className="font-semibold text-xl">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}

export { Header };
