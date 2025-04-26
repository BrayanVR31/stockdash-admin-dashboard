import { Box, Text, VStack, Flex, Link } from "@chakra-ui/react";
import { TbLayoutDashboard } from "react-icons/tb";
import { PiStackBold } from "react-icons/pi";
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <Box
      data-container="sidebar"
      as="aside"
      bg={{
        base: "gray.900",
        _dark: "gray.950",
      }}
      transition="width 0.2s"
      borderRightWidth="1.5px"
      borderRightColor={{
        _dark: "gray.900",
      }}
      width="85px"
      color="white"
      py={4}
      px={5}
      display={{
        base: "none",
        md: "block",
      }}
    >
      <Flex data-container="logo-wrapper" align="center" fontSize="lg" mb={4}>
        <Flex
          wrap="wrap"
          justify="center"
          align="center"
          width="9"
          aspectRatio="square"
          rounded="full"
          bgGradient="to-bl"
          gradientFrom="blue.600"
          gradientTo="purple.700"
        >
          <PiStackBold />
        </Flex>
        <Text data-logo="logo-text" ml={2} as="span" fontWeight="bold">
          Stockdash
        </Text>
      </Flex>
      <VStack
        align="stretch"
        gap={4}
        css={{
          "[data-container=dashboard]:not(:has(:checked)) &": {
            alignItems: "center",
          },
        }}
      >
        <Link
          px={3}
          py={3}
          fontSize="sm"
          rounded="sm"
          textDecoration="none"
          color="gray.300/90"
          _hover={{
            _dark: {
              "&:not(.active)": {
                background: "gray.400/30",
                color: "gray.100",
              },
            },
          }}
          css={{
            "&.active": {
              _dark: {
                background: "purple.800/80",
                color: "purple.300",
              },
            },
          }}
          transition="colors 0.5s"
          data-link="sidebar-link"
          asChild
        >
          <NavLink to="/dashboard">
            <TbLayoutDashboard size={16} />
            <Text as="span">Dashboard</Text>
          </NavLink>
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
