import { useRef, useState, useMemo, ChangeEvent } from "react";
import {
  Pencil,
  Trash2,
  X,
  ArrowDownUp,
  PackageX,
  Search,
  Database,
  PackageOpen,
} from "lucide-react";
import { getDeepValues, getDeepValueFromObj, GenericObject } from "./object";
import { Fragment } from "react/jsx-runtime";
import withPagination from "@/components/pagination";
import { filterList } from "@/utils/filter";
import { usePagination } from "@/components/pagination";

// Types
interface TableProps<T> {
  objectKeys: string[];
  headerCols: string[];
  data: T[];
  action?: {
    onDelete: (id: string) => void;
    onEdit: () => void;
    onBulkDelete?: (ids: string[]) => void;
  };
  editModalRef: React.RefObject<HTMLDialogElement>;
}

interface TableHeaderProps {
  headerCols: string[];
  onSearch: (value: string) => void;
  searchValue: string;
  onBulkDelete?: () => void;
  selectedCount: number;
}

interface TableRowProps<T> {
  data: T;
  objectKeys: string[];
  headerCols: string[];
  selectedIds: string[];
  onSelectRow: (id: string) => void;
  onDelete: (id: string) => void;
  editModalRef: React.RefObject<HTMLDialogElement>;
}

interface DeleteModalProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  onConfirm: () => void;
}

interface BulkDeleteModalProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  onConfirm: () => void;
  count: number;
}

// Components
const TableHeader: React.FC<TableHeaderProps> = ({
  headerCols,
  onSearch,
  searchValue,
  onBulkDelete,
  selectedCount,
}) => (
  <div className="mb-6 flex justify-between items-center">
    <label className="input input-primary w-max">
      <Search className="w-3.5" />
      <input
        onChange={(e) => onSearch(e.target.value)}
        value={searchValue}
        type="search"
        placeholder="Busca los datos de la tabla"
        className="max-sm:w-20"
      />
    </label>
    <div className="flex gap-4">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-outline btn-primary">
          <PackageX className="w-4" />
          <span className="hidden sm:block">Eliminar</span>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 border border-gray-500 shadow-md"
        >
          <li>
            <button
              onClick={onBulkDelete}
              className="hover:bg-primary hover:text-white"
              disabled={selectedCount === 0}
            >
              Eliminar {selectedCount > 0 ? `(${selectedCount})` : ""}{" "}
              seleccionados
            </button>
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-end dropdown-bottom">
        <div tabIndex={0} role="button" className="btn btn-outline btn-primary">
          <ArrowDownUp className="w-4" />
          <span className="hidden sm:block">Ordenar</span>
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
);

const DeleteModal: React.FC<DeleteModalProps> = ({ modalRef, onConfirm }) => (
  <dialog ref={modalRef} className="modal">
    <div className="modal-box">
      <h4 className="font-bold text-xl text-center mb-4 flex justify-center items-center">
        <Trash2 className="text-red-500 mr-2" />
        <span>Eliminación de registro</span>
      </h4>
      <p className="text-center">
        Al elegir esta opción, se eliminará por completo toda la información
        relacionada con este elemento.
      </p>
      <div className="modal-action justify-center">
        <button
          onClick={onConfirm}
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
);

const BulkDeleteModal: React.FC<BulkDeleteModalProps> = ({
  modalRef,
  onConfirm,
  count,
}) => (
  <dialog ref={modalRef} className="modal">
    <div className="modal-box">
      <h4 className="font-bold text-xl text-center mb-4 flex justify-center items-center">
        <Trash2 className="text-red-500 mr-2" />
        <span>Eliminación masiva</span>
      </h4>
      <p className="text-center">
        Al elegir esta opción, se eliminarán por completo {count} elementos
        seleccionados. Esta acción no se puede deshacer.
      </p>
      <div className="modal-action justify-center">
        <button
          onClick={onConfirm}
          className="btn btn-error bg-red-600 border-red-600 text-white hover:bg-red-600/80"
        >
          Eliminar {count} elementos
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
);

const TableRow = <T extends GenericObject>({
  data,
  objectKeys,
  selectedIds,
  onSelectRow,
  onDelete,
  editModalRef,
}: TableRowProps<T>) => {
  const id = getDeepValueFromObj(data, "_id") as unknown as string;

  return (
    <tr key={`header-row-${id}`}>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            onChange={() => onSelectRow(id)}
            checked={selectedIds.includes(id)}
          />
        </label>
      </th>
      {getDeepValues(data, ...objectKeys).map((item, index) => (
        <td key={`cell-[${index}]-${item}`}>
          {!item ? "Sin especificar" : String(item)}
        </td>
      ))}
      <td>
        <button
          onClick={() => editModalRef.current?.showModal()}
          className="btn btn-square btn-outline btn-primary max-sm:btn-xs"
        >
          <Pencil className="w-4 max-sm:w-3" />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="ml-4 btn btn-square btn-outline btn-error max-sm:btn-xs"
        >
          <Trash2 className="w-4 max-sm:w-3.5" />
        </button>
      </td>
    </tr>
  );
};

const Table = <T extends GenericObject>({
  objectKeys,
  headerCols,
  data,
  action,
  editModalRef,
}: TableProps<T>) => {
  const [search, setSearch] = useState("");
  const { currentPage } = usePagination();
  const deletionModal = useRef<HTMLDialogElement>(null);
  const bulkDeletionModal = useRef<HTMLDialogElement>(null);
  const currentId = useRef<string>(null);
  const ids = data.map((item) => item._id);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [firstStatus, setFirstStatus] = useState(false);

  const filteredList = useMemo(
    () => filterList(data, objectKeys, search),
    [search, currentPage, data, objectKeys]
  );

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const statusCheck = e.target.checked;
    setFirstStatus(statusCheck);
    setSelectedIds(statusCheck ? ids : []);
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    currentId.current = id;
    deletionModal.current?.showModal();
  };

  const handleConfirmDelete = () => {
    if (action?.onDelete && currentId.current) {
      action.onDelete(currentId.current);
      deletionModal.current?.close();
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length > 0) {
      bulkDeletionModal.current?.showModal();
    }
  };

  const handleConfirmBulkDelete = () => {
    if (action?.onBulkDelete && selectedIds.length > 0) {
      action.onBulkDelete(selectedIds);
      bulkDeletionModal.current?.close();
      setSelectedIds([]);
      setFirstStatus(false);
    }
  };

  return (
    <>
      <TableHeader
        headerCols={headerCols}
        onSearch={setSearch}
        searchValue={search}
        onBulkDelete={handleBulkDelete}
        selectedCount={selectedIds.length}
      />
      {data.length > 0 ? (
        <div className="overflow-x-auto rounded-box border border-gray-500/80 bg-layer">
          <table className="table max-[820px]:table-xs max-[820px]:table-pin-rows max-[820px]:table-pin-cols group/opt">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    onChange={handleSelectAll}
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
              {filteredList.map((rowData) => (
                <TableRow
                  key={rowData._id}
                  data={rowData}
                  objectKeys={objectKeys}
                  headerCols={headerCols}
                  selectedIds={selectedIds}
                  onSelectRow={handleSelectRow}
                  onDelete={handleDelete}
                  editModalRef={editModalRef}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 flex flex-col items-center justify-center gap-2 flex-wrap">
          <div className="relative flex items-center justify-center">
            {/* Background Database icon */}
            <div
              className="absolute right-0 text-primary/40"
              style={{
                transform: "translate(20%, 20%)",
                zIndex: 1,
              }}
            >
              <Database size={40} />
            </div>

            {/* Foreground PackageOpen icon */}
            <div
              className="text-primary/30"
              style={{
                transform: "translate(-20%, -20%)",
                zIndex: 2,
              }}
            >
              <PackageOpen size={85} />
            </div>
          </div>
          <span>No hay datos para mostrar</span>
        </div>
      )}

      <DeleteModal modalRef={deletionModal} onConfirm={handleConfirmDelete} />
      <BulkDeleteModal
        modalRef={bulkDeletionModal}
        onConfirm={handleConfirmBulkDelete}
        count={selectedIds.length}
      />
    </>
  );
};

// Skeleton component remains unchanged
interface SkeletonTableProps {
  rows: number;
  cols: number;
}

export const SkeletonTable = ({ rows, cols }: SkeletonTableProps) => {
  const records = Array(rows).fill(null);
  const cells = Array(cols).fill(
    <div className="skeleton h-4.5 w-full loading-bg" />
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
