import { useRef, useState, useMemo, ChangeEvent } from "react";
import { Pencil, Trash2, X, ArrowDownUp, PackageX, Search } from "lucide-react";
import { getDeepValues, getDeepValueFromObj, GenericObject } from "./object";
import { Fragment } from "react/jsx-runtime";
import withPagination from "@/components/pagination";
import { filterList } from "@/utils/filter";
import { usePagination } from "@/components/pagination";

interface Props<T> {
  objectKeys: string[];
  headerCols: string[];
  data: T;
  action?: {
    onDelete: (id: string) => void;
    onEdit: () => void;
  };
}

const Table = <T,>({ objectKeys, headerCols, data, action }: Props<T[]>) => {
  const [search, setSearch] = useState("");
  const { currentPage } = usePagination();
  const deletionModal = useRef<HTMLDialogElement>(null);
  const currentId = useRef<string>(null);
  const ids = data.map((item) => (item as GenericObject)["_id"]);
  /** Checkbox handle all nested checkboxes */
  const [firstStatus, setFirstStatus] = useState(false);
  const onSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const statusCheck = e.target.checked;
    setFirstStatus(statusCheck);
    if (statusCheck) setSelectedIds(ids);
    else setSelectedIds([]);
    console.log({ ids });
    /*
    if (isSelectedAll) setSelectedIds([]);
    else setSelectedIds(data.map((item) => (item as GenericObject)["_id"]));
    */
  };
  const onSelectSingle = (id: string) => () => {
    console.log({ id });
  };
  const filteredList = useMemo(
    () => filterList(data, objectKeys, search),
    [search, currentPage],
  );

  /** Selected all checkbox depending first checkbox */
  const [selectedIds, setSelectedIds] = useState<string[]>(
    firstStatus ? ids : [],
  );
  const isSelectedAll = data.length > 0 && selectedIds.length === data.length;
  return (
    <>
      {/** Filter, deletion, sort options */}
      <div className="mb-6 flex justify-between items-center">
        <label className="input input-primary">
          <Search className="w-3.5" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="search"
            placeholder="Busca los datos de la tabla"
          />
        </label>
        <div>
          {/** Delete options */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline btn-primary"
            >
              <PackageX className="w-4" />
              <span>Eliminar</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 border border-gray-500 shadow-md"
            >
              <li>
                <button className="hover:bg-primary hover:text-white">
                  Eliminar todo
                </button>
              </li>
              <li>
                <button className="hover:bg-primary hover:text-white">
                  Eliminar elemento
                </button>
              </li>
            </ul>
          </div>
          {/** Sort by options */}
          <div className="dropdown dropdown-end dropdown-bottom ml-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline btn-primary"
            >
              <ArrowDownUp className="w-4" />
              <span>Ordenar</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 border border-gray-500 shadow-md"
            >
              {headerCols.map((col, index) => (
                <li key={`${col}-${index}`}>
                  <button className="hover:bg-primary hover:text-white">
                    {col}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-box border border-gray-500/80 bg-layer">
        <table className="table max-[820px]:table-xs max-[820px]:table-pin-rows max-[820px]:table-pin-cols group/opt">
          <thead>
            <tr>
              {/** Checkbox to select all rows */}
              <th>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  onChange={onSelectAll}
                  checked={firstStatus}
                />
              </th>
              {headerCols.map((col) => (
                <th key={col}>{col}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((data) => (
              <tr
                key={`header-row-${getDeepValueFromObj(
                  data as GenericObject,
                  "_id",
                )}`}
              >
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      onChange={onSelectSingle(
                        (data as GenericObject)["_id"] as string,
                      )}
                      checked={selectedIds.includes(
                        (data as GenericObject)["_id"],
                      )}
                    />
                  </label>
                </th>
                {getDeepValues(data as GenericObject, ...objectKeys).map(
                  (item, index) => (
                    <td key={`cell-[${index}]-${item}`}>
                      {(item as unknown as string) || "Sin especificar"}
                    </td>
                  ),
                )}
                <td>
                  <button className="btn btn-square btn-outline btn-primary max-sm:btn-xs">
                    <Pencil className="w-4 max-sm:w-3" />
                  </button>
                  <button
                    onClick={() => {
                      currentId.current = getDeepValueFromObj(
                        data as GenericObject,
                        "_id",
                      ) as unknown as string;
                      if (deletionModal.current) {
                        deletionModal.current.showModal();
                      }
                    }}
                    className="ml-4 btn btn-square btn-outline btn-error max-sm:btn-xs"
                  >
                    <Trash2 className="w-4 max-sm:w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/** Modal messages */}
        <dialog ref={deletionModal} className="modal">
          <div className="modal-box">
            <h4 className="font-bold text-xl text-center mb-4 flex justify-center items-center">
              <Trash2 className="text-red-500 mr-2" />
              <span>Eliminación de registro</span>
            </h4>
            <p className="text-center">
              Al elegir esta opción, se eliminará por completo toda la
              información relacionada con este elemento.
            </p>
            <div className="modal-action justify-center">
              <button
                onClick={() => {
                  if (action?.onDelete) {
                    if (currentId.current) {
                      action.onDelete(currentId.current);
                      deletionModal?.current?.close();
                    }
                  }
                }}
                className="btn btn-error bg-red-600 border-red-600 text-white hover:bg-red-600/80"
              >
                Eliminar
              </button>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  <X className="w-4.5" />
                </button>
                <button className="btn btn-neutral">Cancelar</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
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
