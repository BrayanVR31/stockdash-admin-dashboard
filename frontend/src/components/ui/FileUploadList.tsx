import {
  useFileUploadContext,
  FileUpload,
  Float,
  Progress,
  HStack,
} from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { UploadStatus } from "@/services/upload";

interface Props {
  progressUpload?: number;
  status?: UploadStatus;
}

type variants = "green" | "red" | "gray" | "yellow";

const matchStatusPalette: Record<UploadStatus, variants> = {
  success: "green",
  error: "red",
  idle: "yellow",
  pending: "gray",
};

const FileUploadList = ({ progressUpload = 0, status = "idle" }: Props) => {
  console.log("progress: ", progressUpload);
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item
          w="auto"
          boxSize="20"
          p="2"
          file={file}
          key={file.name}
          alignSelf="center"
        >
          <FileUpload.ItemPreviewImage />
          <Progress.Root
            colorPalette={matchStatusPalette[status]}
            pos="absolute"
            left="0"
            bottom="-3"
            size="xs"
            variant="outline"
            value={progressUpload}
            w="20"
          >
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

export default FileUploadList;
