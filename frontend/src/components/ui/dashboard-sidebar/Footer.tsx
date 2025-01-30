import { LogOut, CircleUser } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function Footer() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="h-fit">
              <ProfileButton />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>
              <CircleUser />
              <span>Cuenta</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut />
              <span>Salir de la sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function ProfileButton() {
  const image = "https://avatars.pfptown.com/830/rick-and-morty-pfp-4857.png";
  return (
    <>
      <div className="w-11 rounded-full aspect-square relative after:content-[''] after:absolute after:w-3 after:aspect-square after:bg-green-600/85 after:border after:border-gray-50/85 after:translate-y-1/3 after:rounded-full after:bottom-0 after:right-[10%] group-data-[state='collapsed']:after:w-2">
        <img
          className="w-full h-full rounded-full"
          src={image}
          alt="User avatar"
        />
      </div>
      <p className="flex flex-col group-data-[state='collapsed']:hidden">
        <span className="font-normal">Francisco Juaréz</span>
        <span className="font-normal text-gray-300">admin@gmail.com</span>
      </p>
    </>
  );
}

export { Footer };
