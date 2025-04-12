import { useRef, useState, useMemo, ChangeEvent, useCallback } from "react";
import { useNavigate } from "react-router";
import { filterList, sortList } from "@/utils/filter";
import ColHeader from "./ColHeader";
import { useTable, PaginationTable, Order } from "./";
import DeleteModal from "./DeleteModal";
import BulkDeleteModal from "./BulkDeleteModal";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import NotFoundTable from "./NotFoundTable";
import { GenericObject } from "@/utils/object";

// Types
interface Props<T> {
  objectKeys: string[];
  headerCols: string[];
  withImage?: boolean;
  data: T[];
  action?: {
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onBulkDelete?: (ids: string[]) => void;
  };
  editModalRef: React.RefObject<HTMLDialogElement>;
}

export const Table = <T extends GenericObject>({
  objectKeys,
  headerCols,
  data,
  action,
  withImage = false,
}: Props<T>) => {
  const mergedColumns = headerCols
    .map((col, index) => ({
      [col]: objectKeys?.[index] || null,
    }))
    .reduce((prev, current) => ({ ...prev, ...current }), {});
  const context = useTable() as PaginationTable;
  const { sorting, paginating } = context;

  console.log("Table component rendering with sorting:", sorting);

  const [search, setSearch] = useState("");
  const deletionModal = useRef<HTMLDialogElement>(null);
  const bulkDeletionModal = useRef<HTMLDialogElement>(null);
  const currentId = useRef<string>(null);
  const ids = data.map((item) => item._id);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [firstStatus, setFirstStatus] = useState(false);

  const filteredList = useMemo(
    () => filterList(data, objectKeys, search),
    [search, data, objectKeys, paginating],
  );

  const navigate = useNavigate();

  // Apply sorting to the filtered list
  const sortedList = useMemo(() => {
    console.log("Computing sorted list with sorting state:", sorting);

    if (sorting.colName && sorting.colName.trim() !== "") {
      console.log("Applying sort with:", sorting.colName, sorting.order);
      try {
        const result = sortList(filteredList, sorting.colName, sorting.order);
        console.log("Sorted list first item:", result[0] || "No items");
        return result;
      } catch (error) {
        console.error("Error sorting list:", error);
        return filteredList;
      }
    }

    return filteredList;
  }, [filteredList, sorting.colName, sorting.order]);

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const statusCheck = e.target.checked;
    setFirstStatus(statusCheck);
    setSelectedIds(statusCheck ? ids : []);
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
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
                {withImage && <th>Imagen</th>}
                {headerCols.map((col) => (
                  <ColHeader
                    key={col}
                    colName={col}
                    colKey={mergedColumns[col] || ""}
                  />
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedList.map((rowData) => (
                <TableRow
                  key={rowData._id}
                  data={rowData}
                  objectKeys={objectKeys}
                  headerCols={headerCols}
                  selectedIds={selectedIds}
                  onSelectRow={handleSelectRow}
                  onDelete={handleDelete}
                  onEdit={(id) => {
                    action?.onEdit(id);
                    navigate(`./form/${id}`);
                  }}
                  withImage={withImage}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NotFoundTable />
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
