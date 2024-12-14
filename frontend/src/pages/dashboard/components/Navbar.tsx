import { LuSettings } from "react-icons/lu";
import {
  Field,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@shared/ui";

export function Navbar() {
  return (
    <div className="bg-white px-10 shadow-md shadow-slate-500/15 h-[calc(1.25rem+3.5rem)]">
      <nav className="flex items-center justify-between h-full">
        <div>
          <Field.Input type="search" placeholder="Busca aquí..." />
        </div>
        <div className="flex gap-x-7">
          <DropdownSystem />
          <DropdownProfile />
        </div>
      </nav>
    </div>
  );
}

function DropdownProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-blue-700 cursor-pointer w-9 h-9 rounded-full flex items-center overflow-hidden">
          <img
            className="block relative min-w-full h-full after:content-[attr(alt)] after:bg-blue-700 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:text-white after:flex after:items-center after:justify-center after:text-lg after:font-medium"
            src=""
            alt="F"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Ver perfil</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem>Configuraciones de perfil</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Salir de sesión</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownSystem() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-slate-700 text-xl outline-0">
          <LuSettings />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Configuraciones</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem>Configuraciones de perfil</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Salir de sesión</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
