import { Text, Stack, Flex, Checkbox, HStack } from "@chakra-ui/react";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import AvatarMenu from "./AvatarMenu";
import { ColorModeButton } from "@/components/ui/color-mode";

export const TopBar = () => {
  return (
    <Flex
      as="header"
      minHeight="75px"
      px={6}
      align="center"
      justify="space-between"
      bg={{
        base: "white",
        _dark: "gray.950",
      }}
      borderBottomWidth="1.5px"
      data-container="top-bar"
    >
      <HStack>
        <Flex justify="flex-end" p={2}>
          <Checkbox.Root size="lg" defaultChecked>
            <Checkbox.HiddenInput />
            <Checkbox.Control
              background="none"
              border="none"
              cursor="pointer"
              color={{
                _light: "gray.800",
                _dark: "gray.100",
              }}
              data-icon="sidebar-collapse"
              css={{
                "[data-container=dashboard]:has(:checked) &": {
                  rotate: "180deg",
                },
              }}
              transition="transform 0.3s ease-in"
            >
              <TbLayoutSidebarLeftExpand />
            </Checkbox.Control>
          </Checkbox.Root>
        </Flex>
        <Text fontSize="lg" fontWeight="semibold">
          Dashboard
        </Text>
      </HStack>
      <Stack direction="row" gap="5">
        <ColorModeButton />
        <AvatarMenu />
      </Stack>
    </Flex>
  );
};
