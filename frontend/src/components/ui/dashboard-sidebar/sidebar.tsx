import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
import { Header } from "./Header";

function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <Menu />
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSidebar };
