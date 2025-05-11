import { useFormContext } from "react-hook-form";
import {
  Dialog,
  Stack,
  Avatar,
  Portal,
  Button,
  ButtonGroup,
  FileUpload,
  Ico,
  ButtonGroupn,
  Box,
  CloseButton,
  Text,
  useFileUploadContext,
  useFileUpload,
} from "@chakra-ui/react";
import { FaRegFolderOpen } from "react-icons/fa";
import { UserInputs } from "@/models/userSchema";
import { ImageInput } from "@/models/imageSchema";

const AvatarImage = () => {
  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 1_000 * 1_000,
  });
  return (
    <Stack
      justify={{
        base: "initial",
        md: "space-between",
      }}
      direction={{ base: "column", md: "row" }}
    >
      <Avatar.Root>
        <Avatar.Fallback name="User" />
        <Avatar.Image src="" />
      </Avatar.Root>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button colorPalette="blue">Subir imagen</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Subida de archivos</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text as="p" mb="6">
                  Selecciona los archivos que deseas adjuntar. Solo se permiten
                  archivos con extensión .jpg, jpeg o .png.
                </Text>
                <ButtonGroup w="full" colorPalette="blue">
                  <FileUpload.RootProvider value={fileUpload}>
                    <FileUpload.HiddenInput />
                    <FileUpload.Label>Agrega archivo(s)</FileUpload.Label>
                    <FileUpload.Trigger asChild>
                      <Button variant="outline">
                        <FaRegFolderOpen />
                        Seleccionar archivos
                      </Button>
                    </FileUpload.Trigger>
                    <FileUpload.List showSize clearable />
                  </FileUpload.RootProvider>
                </ButtonGroup>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button
                  onClick={() => {
                    console.log(fileUpload.acceptedFiles);
                  }}
                  colorPalette="blue"
                  variant="subtle"
                >
                  Adjuntar archivos
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default AvatarImage;
