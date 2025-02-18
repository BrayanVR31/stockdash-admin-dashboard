import { PanelRightOpen, AlignJustify } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Emoji } from "@/components/ui/emoji";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ThemeOpt, NotificationOpt, ProfileOpt, SearchBar } from "./sys-opts";

const MobileList = () => {
  const { setOpenMobile } = useSidebar();
  return (
    <div className="flex items-center gap-x-4">
      <NotificationOpt />
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="border w-10 aspect-square flex items-center justify-center p-1 [&>svg]:w-5 rounded-md"
            type="button"
          >
            <AlignJustify />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu de opciones</SheetTitle>
            <SheetDescription>
              Accede a las opciones del sistema
            </SheetDescription>
          </SheetHeader>
          <div className="pt-8">
            <ThemeOpt fullDescription />
            <button
              onClick={() => setOpenMobile(true)}
              className="w-full py-2 rounded-md mt-4 text-sm flex items-center justify-center gap-x-2"
            >
              <PanelRightOpen className="w-5" />
              <span>Abrir sidebar</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const DesktopList = () => {
  return (
    <ul className="xl:flex gap-x-3 items-center hidden">
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
  );
};

function Navbar() {
  const isDesktop = useMediaQuery("(min-width:768px)");
  return (
    <div className="sticky top-0 left-0 dark:bg-neutral-900 w-full overflow-hidden bg-white z-40 px-6">
      <nav className="w-[95%] mx-auto flex h-full items-center justify-between">
        <div className="flex items-center gap-x-4">
          {isDesktop && (
            <SidebarTrigger>
              <PanelRightOpen />
            </SidebarTrigger>
          )}

          {!isDesktop && <ProfileOpt />}
          <h3 className="font-bold text-2xl hidden xl:block">
            <span className="mr-2">Bienvenido de nuevo</span>
            <Emoji label="claps" symbol="👏" />
          </h3>
          <SearchBar />
        </div>
        {isDesktop ? <DesktopList /> : <MobileList />}
      </nav>
    </div>
  );
}

export { Navbar };
