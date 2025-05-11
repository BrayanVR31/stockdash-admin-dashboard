import { useFormContext } from "react-hook-form";
import { Flex, Text, Button, Stack, Avatar } from "@chakra-ui/react";
import { UserInputs } from "@/models/userSchema";

const AvatarImage = () => {
  return (
    <Stack
      justify={{
        base: "initial",
        md: "space-between",
      }}
      direction={{ base: "column", md: "row" }}
    >
      <Avatar.Root>
        <Avatar.Fallback name="User profile" />
        <Avatar.Image src="" />
      </Avatar.Root>
      <Button colorPalette="blue">Subir imagen</Button>
    </Stack>
  );
};

export default AvatarImage;
