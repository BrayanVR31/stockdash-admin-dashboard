import { Avatar, defineStyle } from "@chakra-ui/react";
import { useProfileSession } from "@/hooks/useProfile";

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.600",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

const AccountPreview = () => {
  const { data } = useProfileSession();
  const { path = "" } = data?.profile?.avatar || {};
  return (
    <Avatar.Root css={ringCss} colorPalette="blue" size="sm">
      <Avatar.Fallback name={data.username || "User"} />
      <Avatar.Image src={path} />
    </Avatar.Root>
  );
};

export default AccountPreview;
