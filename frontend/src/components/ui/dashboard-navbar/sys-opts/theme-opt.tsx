import { SunMedium, LaptopMinimal, Moon } from "lucide-react";
import { ReactNode } from "react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { OptButton } from "./opt-button";
import { useTheme } from "@/components/theme";

type ThemeIcon = "system" | "dark" | "light";
type MatchIcon = { [key in ThemeIcon]: ReactNode };

interface Props {
  fullDescription?: boolean;
}

function ThemeOpt({ fullDescription = false }: Props) {
  const description = fullDescription ? <span>Cambiar el tema</span> : null;
  const { theme } = useTheme();
  const optIcon: MatchIcon = {
    system: <LaptopMinimal />,
    light: <SunMedium />,
    dark: <Moon />,
  };
  return (
    <OptButton
      className="py-2 text-sm w-full aspect-auto gap-x-2"
      render={() => <ThemeDropdown />}
    >
      {optIcon[theme]}
      {description}
    </OptButton>
  );
}

function ThemeDropdown() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenuContent className="w-48">
      <DropdownMenuLabel>Tema de la aplicación</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => setTheme("system")}>
        <LaptopMinimal />
        <span>Sistema</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <SunMedium />
        <span>Claro</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <Moon />
        <span>Oscuro</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export { ThemeOpt };
