import { ReactNode } from "react";
import { Stack, Text, defineStyle } from "@chakra-ui/react";

interface Props {
  title: string;
  children: ReactNode;
}

const titleStyle = defineStyle({
  textAlign: {
    base: "center",
    md: "start",
  },
  fontWeight: "normal",
  fontSize: "md",
});

const SectionField = ({ title, children }: Props) => {
  return (
    <Stack direction="column" gap="6">
      <Text as="h5" {...titleStyle}>
        {title}
      </Text>
      {children}
    </Stack>
  );
};

export default SectionField;
