import { Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <Stack
      rounded="md"
      h="490px"
      mx="auto"
      maxW="6xl"
      bg={{
        base: "white",
        _dark: "gray.900",
      }}
      borderWidth="thin"
      borderColor={{
        base: "gray.300",
        _dark: "gray.600",
      }}
      overflow="hidden"
      shadow="xs"
    >
      {children}
    </Stack>
  );
};

export default Container;
