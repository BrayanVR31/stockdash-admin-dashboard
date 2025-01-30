import { SunMedium, LaptopMinimal, Moon } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { OptButton } from "./opt-button";

function ThemeOpt() {
  return (
    <OptButton render={() => <ThemeDropdown />}>
      <SunMedium />
    </OptButton>
  );
}

function ThemeDropdown() {
  return (
    <DropdownMenuContent className="w-48">
      <DropdownMenuLabel>Tema de la aplicación</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LaptopMinimal />
        <span>Sistema</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <SunMedium />
        <span>Claro</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Moon />
        <span>Oscuro</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export { ThemeOpt };
