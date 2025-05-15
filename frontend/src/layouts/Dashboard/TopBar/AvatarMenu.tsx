import {
  SkeletonCircle,
  Menu,
  Portal,
  Box,
  defineStyle,
} from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useLogOut } from "@/hooks/useAuth";
import { NavLink } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

const AccountPreview = lazy(() => import("./AccountPreview"));

const AvatarMenu = () => {
  const destroySession = useLogOut();
  return (
    <Menu.Root>
      <Menu.Trigger>
        <ErrorBoundary fallback={<SkeletonCircle size="36px" />}>
          <Suspense fallback={<SkeletonCircle size="36px" />}>
            <AccountPreview />
          </Suspense>
        </ErrorBoundary>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item
              css={{
                "&.active": {
                  _dark: {
                    background: "purple.700/60",
                    color: "purple.300/90",
                  },
                  _light: {
                    background: "purple.200/70",
                    color: "purple.900/90",
                  },
                },
              }}
              value="view-profile"
              asChild
            >
              <NavLink to="./account">
                <FaRegUserCircle />
                <Box flex="1">Ver perfil</Box>
              </NavLink>
            </Menu.Item>
            <Menu.Item onClick={() => destroySession()} value="logout">
              <MdOutlineLogout />
              <Box flex="1">Salir de sesión</Box>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default AvatarMenu;
