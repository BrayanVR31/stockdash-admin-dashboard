import { Pencil, Trash2 } from "lucide-react";
import { getDeepValues, getDeepValueFromObj, GenericObject } from "./object";
import { Fragment } from "react/jsx-runtime";
import withPagination from "@/components/pagination";

interface Props<T> {
  objectKeys: string[];
  headerCols: string[];
  data: T;
}

const Table = <T,>({ objectKeys, headerCols, data }: Props<T[]>) => {
  return (
    <div className="overflow-x-auto rounded-box border border-gray-500/80 bg-layer">
      <table className="table max-[820px]:table-xs max-[820px]:table-pin-rows max-[820px]:table-pin-cols">
        <thead>
          <tr>
            {headerCols.map((col) => (
              <th key={col}>{col}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr
              key={`header-row-${getDeepValueFromObj(
                data as GenericObject,
                "_id",
              )}`}
            >
              {getDeepValues(data as GenericObject, ...objectKeys).map(
                (item, index) => (
                  <td key={`cell-[${index}]-${item}`}>
                    {(item as unknown as string) || "Sin especificar"}
                  </td>
                ),
              )}
              <td>
                <button className="btn btn-square btn-outline btn-primary">
                  <Pencil className="w-4" />
                </button>
                <button className="ml-4 btn btn-square btn-outline btn-error">
                  <Trash2 className="w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface SkeletonTableProps {
  rows: number;
  cols: number;
}

export const SkeletonTable = ({ rows, cols }: SkeletonTableProps) => {
  const records = Array(rows).fill(null);
  const cells = Array(cols).fill(
    <div className="skeleton h-4.5 w-full loading-bg" />,
  );
  return (
    <div className="grid grid-rows-5 gap-5 min-h-[250px]">
      <div className="skeleton-header">
        {cells.map((cell, index) => (
          <Fragment key={index}>{cell}</Fragment>
        ))}
      </div>
      {records.map((_, index) => (
        <div
          className="flex py-3 px-3 gap-x-5 border-b border-gray-400/80 last:border-transparent"
          key={index + 1}
        >
          {cells.map((cell, index) => (
            <Fragment key={index}>{cell}</Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default withPagination(Table);
