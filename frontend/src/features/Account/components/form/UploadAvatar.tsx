import { useFormContext, useWatch } from "react-hook-form";
import {
  Button,
  Flex,
  Text,
  Stack,
  FileUpload,
  useFileUpload,
  Code,
} from "@chakra-ui/react";
import { AccountInputs } from "@/models/accountSchema";
import { lazy } from "react";
import { FiUpload } from "react-icons/fi";
import delay from "@/utils/delay";
import FileUploadList from "@/components/ui/FileUploadList";
import { useAttachFile } from "@/hooks/useUpload";
const AccountAvatar = lazy(() => delay(import("./AccountAvatar"), 3_20));

interface Props {
  defaultPath?: string;
}

const UploadAvatar = ({ defaultPath }: Props) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext<AccountInputs>();
  const { mutate: attach, attachProgress } = useAttachFile();
  const avatar = useWatch({
    control,
    name: "profile.avatar",
  });
  const isAdmin = useWatch({
    control,
    name: "isAdmin",
  });
  const username = useWatch({
    control,
    name: "profile.username",
  });
  const name = useWatch({
    control,
    name: "profile.name",
  });
  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 1_048_576,
    accept: "image/*",
    onFileAccept: ({ files }) => {
      if (files.length === 1) {
        const formData = new FormData();
        formData.append("image", [...files].shift() as Blob);
        attach(formData, {
          onSuccess: (data) => {
            setValue("profile.avatar", data._id);
          },
        });
      } else if (files.length > 1) {
        //
      }
    },
  });
  const rejected = fileUpload.rejectedFiles.map((e) => e.file.name);
  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      gap={6}
      align="center"
      justify="space-between"
    >
      <Stack
        direction={{
          base: "column",
          lg: "row",
        }}
        align="center"
        gap="5"
      >
        {/** Avatar */}
        <AccountAvatar path={defaultPath} fallbackMessage={username || name} />
        <Flex
          align={{
            base: "center",
            md: "start",
          }}
          gapY="1"
          direction="column"
        >
          <Text
            textAlign={{
              base: "center",
              md: "start",
            }}
            as="h4"
            fontSize="sm"
            fontWeight="semibold"
          >
            Imagen de perfil
          </Text>
          <Text fontSize="sm" color="gray.500">
            JPG or PNG. 1MB max
          </Text>
        </Flex>
      </Stack>

      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        width={{
          base: "full",
          md: "auto",
        }}
        alignItems="center"
      >
        {/** File upload button */}

        <FileUpload.RootProvider gap={6} value={fileUpload}>
          <FileUpload.HiddenInput />
          <FileUploadList
            status={attachProgress.status}
            progressUpload={attachProgress.value}
          />
          <FileUpload.Trigger asChild>
            <Button
              disabled={!isAdmin}
              w={{
                base: "full",
                md: "auto",
              }}
              colorPalette="purple"
              variant="surface"
            >
              <FiUpload />
              Sube tu imagen
            </Button>
          </FileUpload.Trigger>
          {rejected.length > 0 && (
            <Code colorPalette="red">Error: {rejected.join(", ")}</Code>
          )}
        </FileUpload.RootProvider>
      </Stack>
    </Flex>
  );
};

export default UploadAvatar;
