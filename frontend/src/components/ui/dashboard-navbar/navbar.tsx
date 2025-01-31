import { PanelRightOpen } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Emoji } from "@/components/ui/emoji";
import { ThemeOpt, NotificationOpt, ProfileOpt, SearchBar } from "./sys-opts";

function Navbar() {
  return (
    <div className="sticky top-0 left-0 bg-neutral-900">
      <nav className="w-[95%] mx-auto flex h-full items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SidebarTrigger>
            <PanelRightOpen />
          </SidebarTrigger>
          <h3 className="font-bold text-2xl">
            <span className="mr-2">Bienvenido de nuevo</span>
            <Emoji label="claps" symbol="👏" />
          </h3>
          <SearchBar />
        </div>
        <ul className="flex gap-x-3 items-center">
          <li>
            <NotificationOpt />
          </li>
          <li>
            <ThemeOpt />
          </li>
          <li>
            <ProfileOpt />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export { Navbar };
