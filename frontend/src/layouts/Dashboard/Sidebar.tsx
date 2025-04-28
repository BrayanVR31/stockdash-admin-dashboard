import {
  Box,
  Text,
  VStack,
  Flex,
  Link,
  Collapsible,
  HStack,
  Button,
} from "@chakra-ui/react";
import { TbLayoutDashboard } from "react-icons/tb";
import { PiStackBold } from "react-icons/pi";
import { NavLink } from "react-router";
import { Fragment } from "react";
import navLinks from "./navLinks";
import { MdLabel } from "react-icons/md";
import { CollapseButton, NestedLink } from "@/components/collapsible";
import { useContainerQuery } from "@/hooks/useContainerQuery";

const Sidebar = () => {
  const { containerRef, isMatch } = useContainerQuery(85);
  const props = !isMatch ? { open: false } : {};
  return (
    <Box
      overflowY="scroll"
      position="sticky"
      data-container="sidebar"
      as="aside"
      ref={containerRef}
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
        {navLinks.map(({ label, to, icon, subItems }) => (
          <Fragment key={label}>
            {subItems ? (
              <Collapsible.Root {...props}>
                <CollapseButton toolMessage={!isMatch ? label : ""}>
                  {icon}
                  <Text>{label}</Text>
                </CollapseButton>
                <Collapsible.Content>
                  <VStack mt="2" pl={5}>
                    {subItems.map(({ label, to: subTo }) => (
                      <NestedLink
                        key={`${to}/${subTo}`}
                        path={`${to}/${subTo}`}
                      >
                        {label}
                      </NestedLink>
                    ))}
                  </VStack>
                </Collapsible.Content>
              </Collapsible.Root>
            ) : (
              <NestedLink toolMessage={!isMatch ? label : ""} path={to}>
                <HStack data-link="sidebar-link">
                  {icon}
                  <Text>{label}</Text>
                </HStack>
              </NestedLink>
            )}
          </Fragment>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
