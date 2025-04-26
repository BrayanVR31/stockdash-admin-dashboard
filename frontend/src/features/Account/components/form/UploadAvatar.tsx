import {
  useFormContext,
  useWatch,
  Controller,
  FieldErrors,
} from "react-hook-form";
import {
  Button,
  Flex,
  Input,
  Text,
  Stack,
  SkeletonCircle,
  FileUpload,
  CloseButton,
  InputGroup,
  useFileUpload,
  Code,
} from "@chakra-ui/react";
import { AccountInputs } from "../../models/accountSchema";
import { ErrorBoundary } from "react-error-boundary";
import { lazy, Suspense } from "react";
import { FiUpload } from "react-icons/fi";
import { NotFoundAvatar } from "./AccountAvatar";
import delay from "@/utils/delay";
import FileUploadList from "@/components/ui/FileUploadList";
const AccountAvatar = lazy(() => delay(import("./AccountAvatar"), 3_20));

const UploadAvatar = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<AccountInputs>();
  const avatar = useWatch({
    control,
    name: "profile.avatar",
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
        <ErrorBoundary
          fallback={<NotFoundAvatar alternativeMessage={username || name} />}
        >
          <Suspense fallback={<SkeletonCircle size="16" />}>
            <AccountAvatar
              imageId={avatar || undefined}
              fallbackMessage={username || name}
            />
          </Suspense>
        </ErrorBoundary>
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

        <FileUpload.RootProvider
          onChange={() => {
            console.log(fileUpload.acceptedFiles);
          }}
          value={fileUpload}
        >
          <FileUpload.HiddenInput />
          <FileUploadList />
          <FileUpload.Trigger asChild>
            <Button colorPalette="purple" variant="surface">
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
