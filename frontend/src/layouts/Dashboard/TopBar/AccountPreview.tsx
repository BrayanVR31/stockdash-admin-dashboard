import { Avatar, defineStyle } from "@chakra-ui/react";
import { useProfileSession } from "@/hooks/useProfile";

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.600",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

const AccountPreview = () => {
  const { VITE_API_URL: url, VITE_API_PORT: port } = import.meta.env;
  const { data } = useProfileSession();
  const { path = "" } = data?.profile?.avatar || {};
  const image = `${url}:${port}/${path}`;

  return (
    <Avatar.Root css={ringCss} colorPalette="purple" size="sm">
      <Avatar.Fallback name={data.username} />
      <Avatar.Image src={image} />
    </Avatar.Root>
  );
};

export default AccountPreview;
