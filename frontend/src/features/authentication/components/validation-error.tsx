import { ReactNode } from "react";

// Types
interface Props {
  children: ReactNode;
}

function ValidationError({ children }: Props) {
  return (
    <span className="text-red-600 dark:text-red-300/95 text-sm font-normal absolute bottom-0 translate-y-[120%]">
      {children}
    </span>
  );
}

export { ValidationError };
