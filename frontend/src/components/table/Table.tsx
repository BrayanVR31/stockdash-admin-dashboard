import { Table } from "@chakra-ui/react";
import { useMemo, useEffect } from "react";
import _ from "lodash";
import RowList from "./RowList";
import PickAll from "./PickAll";
import PickAction from "./PickAction";
import HeaderList from "./HeaderList";
import { useTable } from "./useTable";
import { HeadCol } from "@/types/table";

interface Props<T> {
  headingCols: HeadCol[];
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
            <RowList
              onDeleteItem={onDeleteItem}
              data={data}
              fields={headingCols}
            />
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
