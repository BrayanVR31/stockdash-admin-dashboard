import { Pencil, Trash2 } from "lucide-react";
import { getDeepValues, getDeepValueFromObj, GenericObject } from "./object";

interface Props<T> {
  objectKeys: string[];
  headerCols: string[];
  data: T;
}

const Table = <T,>({ objectKeys, headerCols, data }: Props<T[]>) => {
  return (
    <div className="overflow-x-auto rounded-box border border-gray-500/80 bg-layer">
      <table className="table">
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

export default Table;
