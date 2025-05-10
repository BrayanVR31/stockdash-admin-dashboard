import { useFormContext } from "react-hook-form";
import { Flex, Text, Button } from "@chakra-ui/react";
import { UserInputs } from "@/models/userSchema";

const Avatar = () => {
  const { setValue } = useFormContext<UserInputs>();

  const handleUpload = () => {
    // Simulate file upload
    setValue("profile.avatar", {
      path: "uploaded/path",
      extension: "jpg",
      size: 1024,
      refId: "123",
    });
  };

  return (
    <Flex direction="column" gapY="5">
      <Text fontWeight="semibold" fontSize="md">
        Avatar
      </Text>
      <Button onClick={handleUpload}>Upload Avatar</Button>
    </Flex>
  );
};

export default Avatar;
