import { Avatar, defineStyle } from "@chakra-ui/react";
import { useUploadFile } from "@/hooks/useUpload";

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
});

interface Props {
  fallbackMessage: string;
  imageId?: string;
}

const AccountAvatar = ({ fallbackMessage, imageId = "" }: Props) => {
  const { data } = useUploadFile(imageId);
  return (
    <Avatar.Root css={ringCss} colorPalette="purple" size="2xl">
      <Avatar.Fallback name={fallbackMessage} />
      <Avatar.Image src={data.path} />
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
