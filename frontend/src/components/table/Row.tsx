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
  Badge,
  Stack,
  AvatarGroup,
} from "@chakra-ui/react";
import { memo, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { MdOutlineHideImage } from "react-icons/md";
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

type BadgeCellProps<T> = Omit<
  Extract<HeadCol, { type: "badge" }>,
  "type" | "title"
> & { item: T };

const BadgeCell = <T,>({ path, item }: BadgeCellProps<T>) => {
  const text = _.get(item, path, "Sin definir") as string;
  return (
    <Table.Cell>
      <Badge colorPalette="blue">{text}</Badge>
    </Table.Cell>
  );
};

type ImagesCellProps<T> = Omit<
  Extract<HeadCol, { type: "images" }>,
  "type" | "title"
> & { item: T };

const ImagesCell = <T,>({ path, item }: ImagesCellProps<T>) => {
  const [image, text] = path;
  const textName = _.get(item, text, "Anónimo") as string;
  const imgSrc = _.get(item, image, null) as string[];
  const firstImg = ([...imgSrc]?.shift()?.path || null) as string;
  return (
    <Table.Cell>
      <HStack gap="4">
        <Avatar.Root shape="rounded" colorPalette="blue" variant="outline">
          <Avatar.Fallback>
            <MdOutlineHideImage />
          </Avatar.Fallback>
          <Avatar.Image src={firstImg} />
        </Avatar.Root>
        <Text>{textName}</Text>
      </HStack>
    </Table.Cell>
  );
};

type PriceCellProps<T> = Omit<
  Extract<HeadCol, { type: "price" }>,
  "type" | "title"
> & { item: T };

const PriceCell = <T,>({ path, item }: PriceCellProps<T>) => {
  const price = _.get(item, path, 0) as string;
  return (
    <Table.Cell>
      <Text>$ {price}</Text>
    </Table.Cell>
  );
};

type StatusCellProps<T> = Omit<
  Extract<HeadCol, { type: "status" }>,
  "type" | "title"
> & { item: T };

const StatusCell = <T,>({ path, item }: StatusCellProps<T>) => {
  const status = _.get(item, path, false) as boolean;
  return (
    <Table.Cell>
      <Badge colorPalette={status ? "green" : "red"}>
        {status ? "Activo" : "No activo"}
      </Badge>
    </Table.Cell>
  );
};

type StackImageCellProps<T> = Omit<
  Extract<HeadCol, { type: "stack-image" }>,
  "type" | "title"
> & { item: T };

const StackImageCell = <T,>({
  path,
  item,
  nestedType,
  alternativePath,
}: StackImageCellProps<T>) => {
  const [arrayPath, nestedPath] = path;
  const arrayResults = _.get(item, arrayPath, []) as [];
  return (
    <Table.Cell>
      {arrayResults.length === 0 && (
        <Avatar.Root shape="rounded" colorPalette="blue" variant="outline">
          <Avatar.Fallback>
            <MdOutlineHideImage />
          </Avatar.Fallback>
          <Avatar.Image src={null as unknown as undefined} />
        </Avatar.Root>
      )}
      {arrayResults.length >= 1 && (
        <Stack>
          <AvatarGroup colorPalette="blue" stacking="first-on-top">
            {arrayResults.length >= 4
              ? arrayResults.slice(0, 3).map((result, index) => {
                  const altText = _.get(
                    result,
                    alternativePath,
                    null,
                  ) as unknown as string;
                  if (nestedType === "multiple")
                    return (
                      <Avatar.Root
                        key={`${_.get(result, `${nestedPath}[${index}].path`, altText) as string}`}
                      >
                        <Avatar.Fallback name={altText} />
                        <Avatar.Image src={_.get(result, nestedPath)} />
                      </Avatar.Root>
                    );
                })
              : arrayResults.map((result, index) => {
                  const altText = _.get(
                    result,
                    alternativePath,
                    null,
                  ) as unknown as string;
                  if (nestedType === "multiple")
                    return (
                      <Avatar.Root
                        key={`${_.get(result, `${nestedPath}[${index}].path`, altText) as string}`}
                      >
                        <Avatar.Fallback name={altText} />
                        <Avatar.Image src={_.get(result, nestedPath)} />
                      </Avatar.Root>
                    );
                })}
            {arrayResults.length >= 4 && (
              <Avatar.Root>
                <Avatar.Fallback>+{arrayResults.length - 3}</Avatar.Fallback>
              </Avatar.Root>
            )}
          </AvatarGroup>
        </Stack>
      )}
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
        {fields.map((field) => {
          if (field.type === "avatar")
            return (
              <AvatarCell
                item={item}
                key={`row-data-${field.path}`}
                path={field.path}
              />
            );
          else if (field.type === "text")
            return (
              <Table.Cell key={`row-data-${field.path}`}>
                {_.get(item, field.path, "Sin especificar") as string}
              </Table.Cell>
            );
          else if (field.type === "badge")
            return (
              <BadgeCell
                item={item}
                key={`row-data-${field.path}`}
                path={field.path}
              />
            );
          else if (field.type === "images")
            return (
              <ImagesCell
                item={item}
                key={`row-data-${field.path}`}
                path={field.path}
              />
            );
          else if (field.type === "price")
            return (
              <PriceCell
                item={item}
                key={`row-data-${field.path}`}
                path={field.path}
              />
            );
          else if (field.type === "status")
            return (
              <StatusCell
                item={item}
                key={`row-data-${field.path}`}
                path={field.path}
              />
            );
          else if (field.type === "stack-image")
            return (
              <StackImageCell
                item={item}
                key={`row-data-${field.path}`}
                path={field.path}
                nestedType={field.nestedType}
                alternativePath={field.alternativePath}
              />
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
