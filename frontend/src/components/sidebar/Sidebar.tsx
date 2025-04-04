import { Layers, LogOut, Menu, User } from "lucide-react";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useSplitRoute } from "@/hooks/useSplitRoute";
import { menuItems } from "./menuItems";
import { useSidebar } from "./SidebarProvider";

interface LogoProps {
  showTitle?: boolean;
}

const Logo = ({ showTitle = false }: LogoProps) => {
  return (
    <div
      className={`flex items-center justify-[${
        showTitle ? "start" : "center"
      }] w-full h-navbar-peak sticky top-0 left-0 border-b border-b-neutral px-4 bg-transparent after:content-[''] after:w-2 after:h-full after:bg-transparent after:right-0 after:top-0 after:absolute after:translate-x-1/2`}
    >
      <div className="bg-primary w-10 aspect-square flex items-center justify-center rounded-lg flex-wrap">
        <Layers className="w-5" />
      </div>
      {showTitle && <span className="font-semibold ml-3.5">Stockdash</span>}
    </div>
  );
};

const CollapsedMenu = () => {
  const { joined } = useSplitRoute();
  const profileUrl =
    "https://external-preview.redd.it/TwdryA_T40CDW6pqOOChOhwkKLUlL3cMsLm7foSCrjw.gif?format=png8&s=50bebd0bb62019ca4507d4197c71508901620156";
  return (
    <>
      <Logo />
      <div className="flex-1 flex flex-col justify-between items-center">
        <ul className="menu w-full items-center gap-y-5">
          {menuItems.map((item) => {
            if (item.subMenu) {
              return (
                <li key={item.title} className="dropdown dropdown-right">
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn btn-square border-none bg-${item.parentUrl === joined ? "primary" : "transparent"} shadow-none ${item.parentUrl === joined ? "text-white" : "text-gray-400"} hover:text-white tooltip tooltip-secondary tooltip-right`}
                    data-tip={item.title}
                  >
                    <item.icon className="w-5" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-layer rounded-box w-52 p-2 shadow-lg text-base-content"
                  >
                    {item.subMenu.map((subItem) => (
                      <li
                        className="z-50 relative"
                        key={`${item.title}-${subItem.subTitle}`}
                      >
                        <NavLink
                          className={`hover:bg-primary hover:text-white`}
                          to={subItem.url}
                        >
                          {subItem.subTitle}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            return (
              <li key={item.title}>
                <NavLink
                  className={({ isActive }) =>
                    `btn btn-square bg-${isActive ? "primary" : "transparent"} border-none shadow-none text-${isActive ? "white" : "gray-400"} hover:text-white tooltip tooltip-secondary tooltip-right`
                  }
                  end
                  data-tip={item.title}
                  to={`/${item.parentUrl}`}
                >
                  <item.icon className="w-5 " />
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-center py-2.5">
          <div className="avatar avatar-online">
            <div className="w-9 h-9 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
              <img src={profileUrl} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SingleMenu = () => {
  const { joined } = useSplitRoute();
  const profileUrl =
    "https://external-preview.redd.it/TwdryA_T40CDW6pqOOChOhwkKLUlL3cMsLm7foSCrjw.gif?format=png8&s=50bebd0bb62019ca4507d4197c71508901620156";
  return (
    <>
      {/** Logo */}
      <Logo showTitle />
      <div className="flex-1 flex flex-col justify-between">
        <ul className="menu w-full">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.subMenu ? (
                <details>
                  <summary
                    className={` ${(item.parentUrl === joined && "bg-primary") || "hover:bg-gray-400/10"}`}
                  >
                    <item.icon className="w-4" />
                    <span>{item.title}</span>
                  </summary>
                  <ul>
                    {item.subMenu.map((subItem) => (
                      <li key={`${item.title}-${subItem.subTitle}`}>
                        <NavLink
                          className="hover:bg-gray-400/10"
                          to={subItem.url}
                        >
                          {subItem.subTitle}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    `hover:bg-gray-400/10 bg-${isActive ? "primary" : "transparent"}`
                  }
                  to={`/${item.parentUrl}`}
                  end
                >
                  <item.icon className="w-4" />
                  <span>{item.title}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <div className="dropdown dropdown-right dropdown-end px-2 py-2.5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-xl btn-ghost bg-transparent hover:bg-neutral-500/20 text-white w-full justify-between"
          >
            <div className="flex items-center">
              <div className="avatar mr-3">
                <div className="w-9 h-9 rounded-full">
                  <img src={profileUrl} />
                </div>
              </div>
              <p className="flex flex-col">
                <span className="font-semibold text-sm">Username here</span>
                <span className="text-xs">email@gmail.com</span>
              </p>
            </div>
            <LogOut className="w-4.5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-layer rounded-box z-1 w-52 shadow-md"
          >
            <li>
              <a className="hover:bg-primary">
                <User className="w-4.5" />
                <span>Perfil</span>
              </a>
            </li>
            <li>
              <a className="hover:bg-primary">
                <LogOut className="w-4.5" />
                <span>Salir de sesión</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const DesktopSidebar = () => {
  const { isCollapsed } = useSidebar();
  return (
    <motion.aside
      layout
      animate={{
        width: isCollapsed
          ? "var(--spacing-sidebar-min-span)"
          : "var(--spacing-sidebar-max-span)",
      }}
      style={{
        width: isCollapsed
          ? "var(--spacing-sidebar-min-span)"
          : "var(--spacing-sidebar-max-span)",
      }}
      className="admin-sidebar z-10"
      transition={{
        duration: 0.35,
        type: "spring",
        bounce: 0.2,
      }}
    >
      {isCollapsed ? <CollapsedMenu /> : <SingleMenu />}
    </motion.aside>
  );
};

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 500px)");
  if (isMobile) return null;
  return <DesktopSidebar />;
};

const SidebarDrawer = () => {
  const profileUrl =
    "https://external-preview.redd.it/TwdryA_T40CDW6pqOOChOhwkKLUlL3cMsLm7foSCrjw.gif?format=png8&s=50bebd0bb62019ca4507d4197c71508901620156";
  return (
    <div className="drawer z-50">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="sidebar-drawer"
          className="btn btn-circle drawer-button"
        >
          <Menu className="w-4.5" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="sidebar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu bg-base-100 text-base-content min-h-full w-[80%]">
          <li className="border-b border-neutral">
            <div className="flex flex-col pb-4">
              <div className="avatar avatar-online">
                <div className="w-28 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                  <img src={profileUrl} />
                </div>
              </div>
              <span className="text-xl font-semibold">Username here</span>
              <span className="text-sm text-gray-500">email@gmail.com</span>
            </div>
          </li>
          {menuItems.map((item) => (
            <li className="mt-4" key={item.title}>
              {item.subMenu ? (
                <details open>
                  <summary className="hover:bg-gray-400/10">
                    <item.icon className="w-4" />
                    <span>{item.title}</span>
                  </summary>
                  <ul>
                    {item.subMenu.map((subItem) => (
                      <li key={`${item.title}-${subItem.subTitle}`}>
                        <NavLink
                          className="hover:bg-gray-400/10"
                          to={subItem.url}
                        >
                          {subItem.subTitle}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <NavLink to="" className="hover:bg-gray-400/10">
                  <item.icon className="w-4" />
                  <span>{item.title}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface DockNavigationProps {
  dockItems?: number;
}

const DockNavigation = ({ dockItems = 2 }: DockNavigationProps) => {
  return (
    <div className="dock dock-xl bg-navbar text-neutral-content">
      {menuItems.slice(0, dockItems).map((item) => (
        <button key={item.title}>
          <item.icon />
          <span className="dock-label">{item.title}</span>
        </button>
      ))}
      <button className="dock-active">
        <User />
        <span className="dock-label">Perfil</span>
      </button>
    </div>
  );
};

export { Sidebar, SidebarDrawer, DockNavigation };
