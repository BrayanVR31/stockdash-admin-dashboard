import { Flex, Box, SystemStyleObject, Stack } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { TopBar } from "./TopBar";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "./context";
import { useEffect } from "react";
import { getLocation } from "@/historyLocation";

const cssRules: SystemStyleObject = {
  "&:has([data-container=top-bar] :checked)": {
    "& [data-icon=sidebar-collapse]": {
      rotate: "180deg",
    },
    "& [data-container=sidebar]": {
      width: "320px",
      "& [data-link=sidebar-link]": {
        mx: "initial",
        "&  :not(svg)": {
          display: "flex",
        },
      },
      "& [data-logo=logo-text]": {
        width: "auto",
        ml: 2,
      },
      "& [data-container=logo-wrapper]": {
        justifyContent: "start",
      },
    },
  },
  "&:has([data-container=top-bar])": {
    "& [data-container=sidebar]": {
      "& [data-icon=sidebar-collapse]": {
        rotate: "0deg",
      },
      "& [data-link=sidebar-link]": {
        mx: "auto",
        "& > :not(svg)": {
          display: "none",
        },
      },
      "& [data-logo=logo-text]": {
        width: "0px",
        ml: 0,
      },
      "& [data-container=logo-wrapper]": {
        justifyContent: "center",
      },
    },
  },
};

const Layout = () => {
  const location = useLocation();
  useDocumentTitle("Home", {
    restoreOnMount: true,
  });
  useEffect(() => {
    getLocation.setPath(location.pathname);
  }, [location.pathname]);
  return (
    <SidebarProvider breakpoint={85}>
      <Flex css={cssRules} height="100vh" overflow="hidden">
        <Sidebar />
        <Flex flex="1" direction="column">
          <TopBar />
          <Box
            as="main"
            p={6}
            overflowY="auto"
            height="full"
            bg={{
              base: "gray.200",
              _dark: "gray.950",
            }}
          >
            <Outlet />
          </Box>
        </Flex>
        <Toaster />
      </Flex>
    </SidebarProvider>
  );
};

export default Layout;
