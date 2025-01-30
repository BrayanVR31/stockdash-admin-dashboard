import { SunMedium, LaptopMinimal, Moon, Bell } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { OptButton } from "./opt-button";

function NotificationOpt() {
  return (
    <OptButton render={() => <NotificationDropdown />}>
      <Bell />
    </OptButton>
  );
}

function NotificationDropdown() {
  return (
    <DropdownMenuContent className="w-48">
      <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <span className="text-sm p-2">Sin notificaciones</span>
    </DropdownMenuContent>
  );
}

export { NotificationOpt };
