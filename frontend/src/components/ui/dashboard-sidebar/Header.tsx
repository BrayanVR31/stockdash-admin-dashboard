import { PanelRightOpen } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/ui/Logo";

function Header() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="py-2 flex items-center justify-between h-[65px]">
        <div className="flex items-center gap-x-4">
          <Logo variation="small" />
          <h3 className="text-lg font-semibold group-data-[state='collapsed']:hidden">
            Stockdash panel
          </h3>
        </div>
        <SidebarTrigger>
          <PanelRightOpen size={16} />
        </SidebarTrigger>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export { Header };
