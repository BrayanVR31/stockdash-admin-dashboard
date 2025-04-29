import { VStack, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

const CardLayout = ({ children, footer, header }: Props) => {
  return (
    <VStack overflow="scroll" justify="space-between" flex="1">
      <Stack
        position="sticky"
        top="0"
        left="0"
        px="5"
        py="5"
        w="full"
        borderBottomWidth="1px"
      >
        {header}
      </Stack>
      <Stack width="full" px="5" py="3" overflow="scroll" flex="1">
        {children}
      </Stack>
      <Stack
        position="sticky"
        bottom="0"
        borderTopWidth="1px"
        px="5"
        py="3"
        w="full"
        direction="row"
        bg={{
          base: "gray.100",
          _dark: "gray.950",
        }}
      >
        {footer}
      </Stack>
    </VStack>
  );
};

export { CardLayout };
