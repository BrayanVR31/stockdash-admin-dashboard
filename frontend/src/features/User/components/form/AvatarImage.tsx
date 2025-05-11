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
} from "@chakra-ui/react";
import { FaRegFolderOpen } from "react-icons/fa";
import { UserInputs } from "@/models/userSchema";

const AvatarImage = () => {
  return (
    <Stack
      justify={{
        base: "initial",
        md: "space-between",
      }}
      direction={{ base: "column", md: "row" }}
    >
      <Avatar.Root>
        <Avatar.Fallback name="User profile" />
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
                <ButtonGroup w="full" colorPalette="blue">
                  <FileUpload.Root maxFiles={2}>
                    <FileUpload.HiddenInput />
                    <FileUpload.Trigger asChild>
                      <Button variant="outline">
                        <FaRegFolderOpen />
                        Seleccionar archivos
                      </Button>
                    </FileUpload.Trigger>
                    <FileUpload.List showSize clearable />
                  </FileUpload.Root>
                </ButtonGroup>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button colorPalette="blue" variant="subtle">
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
