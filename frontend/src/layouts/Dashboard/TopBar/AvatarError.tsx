import { Avatar, Circle, Float } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

const AvatarError = () => {
  return (
    <Avatar.Root>
      <Avatar.Fallback>
        <FaUser />
      </Avatar.Fallback>
      <Float placement="bottom-end" offsetX="1" offsetY="1">
        <Circle
          bg="green.500"
          size="8px"
          outline="0.2em solid"
          outlineColor="bg"
        />
      </Float>
    </Avatar.Root>
  );
};

export default AvatarError;
