import { ReactNode, JSX } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ButtonProps {
  children: ReactNode;
  render: () => JSX.Element;
}

function OptButton({ children, render }: ButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md hover:bg-neutral-600/90 w-9 aspect-square flex items-center justify-center [&>svg]:w-5 transition-colors duration-500">
          {children}
        </button>
      </DropdownMenuTrigger>
      {render()}
    </DropdownMenu>
  );
}

export { OptButton };
