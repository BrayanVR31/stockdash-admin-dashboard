import { ReactNode } from "react";

// types
interface Props {
  children: ReactNode;
}

export function RegistryLayout({ children }: Props) {
  return (
    <div className="bg-white shadow-lg shadow-gray-300 rounded-lg py-16">
      <div className="w-3/4 mx-auto">{children}</div>
    </div>
  );
}
