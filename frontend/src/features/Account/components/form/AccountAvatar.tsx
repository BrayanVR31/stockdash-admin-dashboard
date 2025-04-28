import { Avatar, defineStyle } from "@chakra-ui/react";
import { useUploadFile } from "@/hooks/useUpload";
import { Link } from "react-router";

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

interface Props {
  fallbackMessage: string;
  path?: string;
}

const AccountAvatar = ({ fallbackMessage, path = "" }: Props) => {
  return (
    <Avatar.Root css={ringCss} colorPalette="purple" size="2xl">
      <Avatar.Fallback name={fallbackMessage} />
      <Avatar.Image src={path} />
    </Avatar.Root>
  );
};

interface NotFoundAvatarProps {
  alternativeMessage?: string;
}

export const NotFoundAvatar = ({
  alternativeMessage = "Anonymous",
}: NotFoundAvatarProps) => {
  return (
    <Avatar.Root css={ringCss} colorPalette="purple" size="2xl">
      <Avatar.Fallback name={alternativeMessage} />
      <Avatar.Image src={"not-found"} />
    </Avatar.Root>
  );
};

export default AccountAvatar;
