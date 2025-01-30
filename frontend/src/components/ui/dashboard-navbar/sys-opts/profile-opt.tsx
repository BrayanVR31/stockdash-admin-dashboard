import { UserPen, LogOut, KeyRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function ProfileOpt() {
  const image = "https://avatars.pfptown.com/830/rick-and-morty-pfp-4857.png";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-9 aspect-square rounded-full overflow-hidden">
          <img className="w-full h-full" src={image} alt="User profile" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opciones de perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserPen />
          <span>Editar perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <KeyRound />
          <span>Cambiar contraseña</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut />
          <span>Salir de la sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileOpt };
