import { Text, Stack, Flex, Checkbox, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import AvatarMenu from "./AvatarMenu";
import { ColorModeButton } from "@/components/ui/color-mode";

export const TopBar = () => {
  const [currentDate, setCurrentDate] = useState<null | string>(null);

  useEffect(() => {
    if (!currentDate) {
      const dateNow = new Date();
      const formatDate = new Intl.DateTimeFormat("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
      });
      setCurrentDate(() => formatDate.format(dateNow));
    }
  }, [currentDate]);
  return (
    <Flex
      as="header"
      minHeight="75px"
      px={6}
      align="center"
      justify="space-between"
      bg={{
        base: "white",
        _dark: "gray.950/65",
      }}
      borderBottomWidth="1.5px"
      data-container="top-bar"
      position="sticky"
      top="0"
      left="0"
      zIndex="docked"
      backdropFilter="blur(8px)"
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
      <Text
        fontSize="sm"
        textTransform="capitalize"
        color={{
          base: "gray.600",
          _dark: "gray.300",
        }}
        fontWeight="semibold"
      >
        {currentDate}
      </Text>
      <Stack direction="row" gap="5">
        <ColorModeButton />
        <AvatarMenu />
      </Stack>
    </Flex>
  );
};
