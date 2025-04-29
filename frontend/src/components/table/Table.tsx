import {
  ActionBar,
  Checkbox,
  Kbd,
  Stack,
  Table,
  Button,
} from "@chakra-ui/react";
import { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import PagingTable from "./PagingTable";
import PerPage from "./PerPage";
import { FaTrash } from "react-icons/fa";
import Row from "./Row";
import RowList from "./RowList";
import PickAll from "./PickAll";
import PickAction from "./PickAction";
import HeaderList from "./HeaderList";
import { useTable } from "./useTable";

export type HeadingCol = {
  path: string;
  content: string;
};

interface Props<T> {
  headingCols: HeadingCol[];
  data: T[];
  totalItems: number;
  onBulkDeletion: (ids: string[]) => void;
  onDeleteItem: (id: string) => void;
}

const TableLayout = <T extends Record<string, unknown>>({
  headingCols,
  data,
  totalItems,
  onBulkDeletion,
  onDeleteItem,
}: Props<T>) => {
  const { selection, setSelection, pathKey, setTotalItems } = useTable();
  const hasSelection = selection.size > 0;
  const indeterminate = hasSelection && selection.size < data.length;
  useEffect(() => {
    setTotalItems(totalItems);
  }, [totalItems, setTotalItems]);
  const fields = useMemo(
    () => headingCols.map(({ path }) => path),
    [headingCols],
  );
  const ids = useMemo(() => {
    const idSet = new Set<string>();
    data.forEach((item) => {
      idSet.add(_.get(item, pathKey) as string);
    });
    return idSet;
  }, [data, pathKey]);

  return (
    <>
      <Table.ScrollArea borderWidth="1px" h="md" rounded="md" mt={4}>
        <Table.Root size="md" stickyHeader colorPalette="purple">
          <Table.Header>
            <Table.Row bg={{ _light: "gray.50", _dark: "gray.900" }}>
              <PickAll
                indeterminate={indeterminate}
                selectedSize={selection.size}
                onSelectItems={({ checked }) => {
                  setSelection(checked ? ids : new Set());
                }}
              />
              <HeaderList fields={headingCols} />
              <Table.ColumnHeader>Acciones</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/** Tabular data */}
            <RowList onDeleteItem={onDeleteItem} data={data} fields={fields} />
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <PickAction
        onDeleteAll={() => onBulkDeletion([...ids])}
        hasSelection={hasSelection}
        selectedItems={selection.size}
      />
    </>
  );
};

export { TableLayout };

/**
<Stack
  position="sticky"
  shadow="lg"
  bottom="0"
  direction={{
    base: "column",
    md: "row",
  }}
  justify="space-between"
  align="center"
  rounded="md"
  px="6"
  py="2"
  bg={{
    base: "white",
    _dark: "gray.900",
  }}
>
  <PerPage />
  <PagingTable count={totalItems} />
</Stack>

*/
