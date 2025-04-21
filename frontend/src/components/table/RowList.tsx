import { Fragment, useEffect, useMemo } from "react";
import _ from "lodash";
import { useTable } from "@/components/table";
import { sortByColumn } from "@/utils/sort";

interface Props {
  data: Record<string, any>[];
  objectPaths: string[];
  id: string;
}

const RowList = ({ data, id, objectPaths }: Props) => {
  const {
    config: { sorting },
  } = useTable();
  const sortedList = useMemo(
    () => sortByColumn(data, sorting.path, sorting.order),
    [sorting, data],
  );
  return (
    <Fragment>
      {sortedList.map((item) => (
        <tr className="flex" key={item[id]}>
          {objectPaths.map((path, index) => (
            <td className="flex-1 truncate" key={index}>
              {_.get(item, path, null) || "Sin especificar"}
            </td>
          ))}
        </tr>
      ))}
    </Fragment>
  );
};

export { RowList };
