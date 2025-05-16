import { Checkbox, Table } from "@chakra-ui/react";
import { memo, useMemo } from "react";
import { useTable } from "./useTable";
import _ from "lodash";

interface Props {
  indeterminate: boolean;
  selectedSize: number;
  onSelectItems: (changes: Checkbox.CheckedChangeDetails) => void;
}

const PickAll = ({ indeterminate, selectedSize, onSelectItems }: Props) => {
  return (
    <Table.ColumnHeader border="none">
      <Checkbox.Root
        size="sm"
        top="0.5"
        aria-label="Select all rows"
        checked={indeterminate ? "indeterminate" : selectedSize > 0}
        onCheckedChange={onSelectItems}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
      </Checkbox.Root>
    </Table.ColumnHeader>
  );
};
export default PickAll;

/**

setSelection(
  changes.checked
    ? (data.map((item) => _.get(item, pathKey)) as string[])
    : [],
);

*/
