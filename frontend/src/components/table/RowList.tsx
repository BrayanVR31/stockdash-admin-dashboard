import { memo } from "react";
import _ from "lodash";
import Row from "./Row";
import { useTable } from "./useTable";

interface Props<T> {
  data: T[];
  fields: string[];
  onDeleteItem: (id: string) => void;
}

const RowList = memo(
  <T extends Record<string, unknown>>({
    data,
    fields,
    onDeleteItem,
  }: Props<T>) => {
    const { pathKey } = useTable();
    return (
      <>
        {data.map((item, index) => (
          <Row
            onDeleteItem={() => onDeleteItem(_.get(item, pathKey) as string)}
            key={`row-${index}`}
            item={item}
            fields={fields}
          />
        ))}
      </>
    );
  },
);

export default RowList;
