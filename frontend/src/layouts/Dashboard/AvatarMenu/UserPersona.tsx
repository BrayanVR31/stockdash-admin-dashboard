import {
  HStack,
  Stack,
  Text,
  Avatar,
  Float,
  Circle,
  defineStyle,
} from "@chakra-ui/react";
import { useProfileSession } from "@/hooks/useProfile";
import { useSidebar } from "../context";

const circleStatus = defineStyle({
  bg: "green.500",
  outline: "0.2em solid",
  outlineColor: "bg",
});

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

const UserPersona = () => {
  const { data } = useProfileSession();
  const { isCollapsed } = useSidebar();

  return (
    <HStack gap="4">
      <Avatar.Root css={ringCss} size="xs" colorPalette="blue">
        <Avatar.Fallback name={data?.username || "User"} />
        <Avatar.Image src={data?.profile?.avatar?.path} />
        <Float offsetX="1" offsetY="1" placement="bottom-end">
          <Circle {...circleStatus} size="8px" />
        </Float>
      </Avatar.Root>
      {isCollapsed && (
        <Stack alignItems="start" gap="0">
          <Text color="gray.300" textStyle="xs" fontWeight="medium">
            {data?.username}
          </Text>
          <Text color="gray.500" textStyle="2xs">
            {data?.email}
          </Text>
        </Stack>
      )}
    </HStack>
  );
};

export default UserPersona;
