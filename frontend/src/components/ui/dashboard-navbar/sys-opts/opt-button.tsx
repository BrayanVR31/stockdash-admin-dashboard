import { ReactNode, JSX } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ButtonProps {
  children: ReactNode;
  render: () => JSX.Element;
  className?: string;
}

function OptButton({ children, render, className = "" }: ButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`rounded-md hover:bg-neutral-600/90 xl:w-9 xl:aspect-square flex items-center justify-center [&>svg]:w-5 transition-colors duration-500 ${className}`}
        >
          {children}
        </button>
      </DropdownMenuTrigger>
      {render()}
    </DropdownMenu>
  );
}

export { OptButton };
