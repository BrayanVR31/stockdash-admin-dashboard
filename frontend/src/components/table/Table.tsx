import { Fragment, useEffect, JSX, useMemo } from "react";
import Pagination from "./Pagination";
import { ColHeading } from "./types";
import { RowList } from "./RowList";
import "./index.css";
import { useTable } from "./context";
import { sortByColumn } from "@/utils/sort";
import { filterByColumn } from "@/utils/filter";

interface Props<T> {
  data: T[];
  colHeadings: ColHeading[];
  perPage?: number[];
  totalResults: number;
  renderRows: (data: T[]) => JSX.Element[];
}

const Table = <T,>({
  data,
  colHeadings,
  totalResults,
  renderRows,
}: Props<T>) => {
  const {
    dispatchConfig,
    config: { pagination, sorting },
  } = useTable();
  const sortedList = useMemo(
    () => sortByColumn(data, sorting.path, sorting.order),
    [sorting, data]
  );

  useEffect(() => {
    dispatchConfig({
      type: "update-total-items",
      payload: {
        totalItems: Math.ceil(totalResults / pagination.selectedPerPage),
      },
    });
  }, [totalResults, pagination.selectedPerPage]);
  const showFilters = colHeadings.reduce(
    (prev, current) => !!prev || !!current.hasFilter,
    false
  );
  return (
    <div className="table-container">
      <table className="table data-table">
        {/** Column headings */}
        <thead>
          <tr className="flex">
            {colHeadings.map(({ content, path }) => (
              <Fragment key={path}>{content}</Fragment>
            ))}
            <td className="col-header">Acciones</td>
          </tr>
          {showFilters && (
            <tr className="flex">
              {colHeadings.map(({ content, path, hasFilter }) => (
                <td key={`input-${path}`} className="flex flex-1">
                  {hasFilter && (
                    <input className="input input-sm input-primary" />
                  )}
                </td>
              ))}
              <td className="flex flex-1" />
            </tr>
          )}
        </thead>
        {/** Row list */}
        <tbody>{renderRows(sortedList)}</tbody>
      </table>
      <Pagination />
    </div>
  );
};

export { Table };
