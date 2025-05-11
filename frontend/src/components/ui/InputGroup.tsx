import { Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const InputGroup = ({ children }: Props) => {
  return (
    <Stack
      direction={{
        base: "column",
        md: "row",
      }}
      gap="6"
    >
      {children}
    </Stack>
  );
};

export default InputGroup;
