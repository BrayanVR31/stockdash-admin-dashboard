import {
  ActionBar,
  Button,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

interface Props {
  hasSelection: boolean;
  selectedItems: number;
  onDeleteAll: () => void;
}

const PickAction = ({ hasSelection, selectedItems, onDeleteAll }: Props) => {
  return (
    <ActionBar.Root open={hasSelection}>
      <ActionBar.Positioner zIndex="overlay">
        <ActionBar.Content>
          <ActionBar.SelectionTrigger>
            {selectedItems} seleccionado(s)
          </ActionBar.SelectionTrigger>
          <ActionBar.Separator />
          <Dialog.Root placement="center">
            <Dialog.Trigger asChild>
              <Button colorPalette="red" variant="surface" size="sm">
                <FaTrash />
                Eliminar
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Eliminar registros</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Dialog.Description>
                      ¿Estás seguro de que deseas eliminar {selectedItems}{" "}
                      dato(s)?
                    </Dialog.Description>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancelar</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={onDeleteAll} colorPalette="red">
                      Eliminar
                    </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </ActionBar.Content>
      </ActionBar.Positioner>
    </ActionBar.Root>
  );
};

export default PickAction;
