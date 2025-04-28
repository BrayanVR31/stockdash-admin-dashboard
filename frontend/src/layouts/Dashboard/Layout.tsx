import { Flex, Box, SystemStyleObject } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { TopBar } from "./TopBar";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Outlet } from "react-router";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

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
          display: "block",
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
  useDocumentTitle("Home", {
    restoreOnMount: true,
  });
  return (
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
          <Breadcrumbs />
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
