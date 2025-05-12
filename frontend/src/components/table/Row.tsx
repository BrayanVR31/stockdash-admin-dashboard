import {
  Text,
  Table,
  Checkbox,
  Menu,
  Button,
  Portal,
  Dialog,
  CloseButton,
  Box,
  Avatar,
  HStack,
  defineStyle,
} from "@chakra-ui/react";
import { memo, useState } from "react";
import { SlOptions } from "react-icons/sl";
import _ from "lodash";
import { useTable } from "./useTable";
import { FaTrash } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";
import { HeadCol } from "@/types/table";
import { matchPath } from "react-router";

interface Props<T> {
  fields: HeadCol[];
  item: T;
  onDeleteItem: () => void;
}

type AvatarCellProps<T> = Omit<
  Extract<HeadCol, { type: "avatar" }>,
  "type" | "title"
> & { item: T };

const AvatarCell = <T,>({ path, item }: AvatarCellProps<T>) => {
  const [image, text] = path;
  const textName = _.get(item, text, "Anónimo") as string;
  const imgSrc = _.get(item, image, null) as string;
  const ringCss = defineStyle({
    outlineWidth: "2px",
    outlineColor: "colorPalette.500",
    outlineOffset: "2px",
    outlineStyle: "solid",
  });
  return (
    <Table.Cell>
      <HStack gap="4">
        <Avatar.Root css={ringCss} colorPalette="blue" variant="subtle">
          <Avatar.Fallback name={textName} />
          <Avatar.Image src={imgSrc} />
        </Avatar.Root>
        <Text>{textName}</Text>
      </HStack>
    </Table.Cell>
  );
};

const Row = memo(
  <T extends Record<string, unknown>>({
    fields,
    item,
    onDeleteItem,
  }: Props<T>) => {
    const { selection, setSelection, pathKey } = useTable();
    const [open, setOpen] = useState(false);
    const id = _.get(item, pathKey) as string;
    const isSelected = selection.has(id);
    return (
      <Table.Row data-selected={isSelected ? "" : undefined}>
        <Table.Cell>
          <Checkbox.Root
            size="sm"
            top="0.5"
            aria-label="Select row"
            checked={isSelected}
            onCheckedChange={({ checked }) => {
              setSelection((prev) => {
                if (checked) return new Set([...prev, id]);
                return new Set([...prev].filter((item) => item !== id));
              });
            }}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>
        </Table.Cell>
        {fields.map(({ path, type }) => {
          if (type === "avatar")
            return (
              <AvatarCell item={item} key={`row-data-${path}`} path={path} />
            );
          else if (type === "text")
            return (
              <Table.Cell key={`row-data-${path}`}>
                {_.get(item, path, "Sin especificar") as string}
              </Table.Cell>
            );
        })}
        <Table.Cell>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="outline" size="sm">
                <SlOptions />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    color="fg.info"
                    _hover={{
                      bg: "bg.info",
                      color: "fg.info",
                    }}
                    value={`edit-${id}`}
                  >
                    <VscEdit />
                    Editar
                  </Menu.Item>
                  <Menu.Item value={`delete-${id}`} asChild>
                    <Dialog.Root
                      lazyMount
                      open={open}
                      onOpenChange={(e) => setOpen(e.open)}
                      placement="center"
                    >
                      <Dialog.Trigger asChild>
                        <Box
                          color="fg.error"
                          _hover={{
                            bg: "bg.error",
                            color: "fg.error",
                          }}
                          px={2}
                          py={1}
                          fontSize="sm"
                          cursor="pointer"
                          display="flex"
                          alignItems="center"
                          gap="2"
                        >
                          <FaTrash size="12" />
                          Eliminar
                        </Box>
                      </Dialog.Trigger>
                      <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                          <Dialog.Content>
                            <Dialog.Header>
                              <Dialog.Title>Eliminar registro</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                              <Dialog.Description>
                                ¿Estás seguro de que deseas eliminar el dato?
                              </Dialog.Description>
                            </Dialog.Body>
                            <Dialog.Footer>
                              <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancelar</Button>
                              </Dialog.ActionTrigger>
                              <Button
                                onClick={() => {
                                  setOpen(false);
                                  onDeleteItem();
                                }}
                                colorPalette="red"
                              >
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
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Table.Cell>
      </Table.Row>
    );
  },
);

export default Row;
