import { Menu, Button, Portal, defineStyle } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ErrorBoundary } from "react-error-boundary";
import delay from "@/utils/delay";
import MenuOptions from "./MenuOptions";
import { useSidebar } from "../context";
import SkeletonMenu from "./SkeletonMenu";

const UserPersona = lazy(() => delay(import("./UserPersona")));

const AvatarMenu = () => {
  const { isCollapsed } = useSidebar();
  const menuTriggerStyle = defineStyle({
    py: "6",
    w: "full",
    justifyContent: !isCollapsed ? "center" : "space-between",
    bg: "transparent",
    _hover: {
      bg: "colorPalette.900/60",
    },
    overflow: "hidden",
  });
  return (
    <Menu.Root positioning={{ placement: "right-end" }}>
      <Menu.Trigger asChild>
        <Button {...menuTriggerStyle} data-menu="profile" colorPalette="blue">
          <ErrorBoundary fallback={<SkeletonMenu />}>
            <Suspense fallback={<SkeletonMenu />}>
              <UserPersona />
              {isCollapsed && (
                <HiOutlineDotsVertical style={{ width: "18px" }} />
              )}
            </Suspense>
          </ErrorBoundary>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <MenuOptions />
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export { AvatarMenu };
