import {
  Box,
  Text,
  VStack,
  Flex,
  Collapsible,
  HStack,
  Menu,
  Button,
  Portal,
} from "@chakra-ui/react";
import { PiStackBold } from "react-icons/pi";
import { Fragment } from "react";
import navLinks from "./navLinks";
import { CollapseButton, NestedLink } from "@/components/collapsible";
import { AvatarMenu } from "./AvatarMenu";
import { useSidebar } from "./context";
import { extractPaths } from "@/utils/paths";
import { useLocation } from "react-router";

const DesktopList = () => {
  const { isCollapsed } = useSidebar();
  const props = !isCollapsed ? { open: false } : {};
  return navLinks.map(({ label, to, icon, subItems, isMain = false }) => (
    <Fragment key={label}>
      {subItems ? (
        <Collapsible.Root {...props}>
          <CollapseButton
            parentPath={to}
            toolMessage={!isCollapsed ? label : ""}
          >
            {icon}
            <Text>{label}</Text>
          </CollapseButton>
          <Collapsible.Content>
            <VStack mt="3" gap="3.5" pl={5}>
              {subItems.map(({ label, to: subTo }) => (
                <NestedLink key={`${to}/${subTo}`} path={`${to}/${subTo}`}>
                  {label}
                </NestedLink>
              ))}
            </VStack>
          </Collapsible.Content>
        </Collapsible.Root>
      ) : (
        <NestedLink
          isMain={isMain}
          toolMessage={!isCollapsed ? label : ""}
          path={to}
        >
          <HStack data-link="sidebar-link">
            {icon}
            <Text>{label}</Text>
          </HStack>
        </NestedLink>
      )}
    </Fragment>
  ));
};

const MobileList = () => {
  const location = useLocation();
  const currentPath = extractPaths(location.pathname, ["create"]).pop() || "";
  return navLinks.map(({ label, to, icon, subItems, isMain = false }) => (
    <Fragment key={label}>
      {subItems ? (
        <Menu.Root positioning={{ placement: "right-start" }}>
          <Menu.Trigger asChild>
            <Button
              bg={
                extractPaths(to, ["dashboard"]).includes(currentPath)
                  ? "blue.700"
                  : "colorPalette"
              }
              data-link="sidebar-link"
              size="sm"
              variant="ghost"
            >
              {icon}
              <Text>{label}</Text>
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {subItems.map(({ label, to: subTo }) => (
                  <Menu.Item asChild value={`${to}/${subTo}`}>
                    <NestedLink key={`${to}/${subTo}`} path={`${to}/${subTo}`}>
                      {label}
                    </NestedLink>
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ) : (
        <NestedLink isMain={isMain} toolMessage={label} path={to}>
          <HStack data-link="sidebar-link">
            {icon}
            <Text>{label}</Text>
          </HStack>
        </NestedLink>
      )}
    </Fragment>
  ));
};

const Sidebar = () => {
  const { isCollapsed, sidebarRef } = useSidebar();
  return (
    <Box
      overflowY="auto"
      position="sticky"
      data-container="sidebar"
      as="aside"
      ref={sidebarRef}
      bg={{
        _light: "gray.950",
        _dark: "gray.950",
      }}
      transition="width 0.2s"
      borderRightWidth="1.5px"
      borderRightColor={{
        _dark: "gray.900",
      }}
      width="85px"
      color="white"
      display={{
        base: "none",
        md: "block",
      }}
    >
      <Flex
        data-container="logo-wrapper"
        align="center"
        fontSize="lg"
        height="75px"
        position="sticky"
        top="0"
        left="0"
        bg={{
          _light: "gray.950",
          _dark: "gray.950",
        }}
        zIndex="sticky"
        borderBottomWidth="1.5px"
        px={5}
        overflow="hidden"
      >
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
          overflow="hidden"
        >
          <PiStackBold />
        </Flex>
        <Text
          display="block"
          data-logo="logo-text"
          ml={2}
          as="span"
          fontWeight="bold"
          overflow="hidden"
        >
          Stockdash
        </Text>
      </Flex>
      <Flex
        direction="column"
        minH="calc(100vh - 75px)"
        justify="space-between"
      >
        <VStack
          align="stretch"
          gap={4}
          p={5}
          css={{
            "[data-container=dashboard]:not(:has(:checked)) &": {
              alignItems: "center",
            },
          }}
        >
          {isCollapsed ? <DesktopList /> : <MobileList />}
        </VStack>
        {/** Avatar menu options */}
        <VStack bg="gray.950" w="full" position="sticky" bottom="0" left="0">
          <HStack px="5" pb="2" w="full">
            <AvatarMenu />
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;
