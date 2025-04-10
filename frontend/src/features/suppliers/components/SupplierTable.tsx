import { useRef } from "react";
import {
  useSupplierList,
  useDeleteSupplier,
  useBulkDeleteSuppliers,
} from "@/hooks/useSupplier";
import { Table, useTable, TableProvider } from "@/components/table";
import withPaginatedTable from "@/components/pagination";

const PaginatedTable = withPaginatedTable(Table);

const QueryTable = () => {
  const { data } = useSupplierList();
  const { mutate } = useDeleteSupplier();
  const { mutate: mutateBulkDelete } = useBulkDeleteSuppliers();
  const editModalRef = useRef<HTMLDialogElement>(null);
  return (
    <PaginatedTable
      totalItems={data.total}
      headerCols={["Nombre", "Email", "Teléfono"]}
      data={data.results}
      objectKeys={["name", "contact.email", "contact.phoneNumber"]}
      action={{
        onDelete: (id) => {
          mutate(id);
        },
        onEdit: () => {
          editModalRef.current?.showModal();
        },
        onBulkDelete: (ids) => {
          if (ids && ids.length > 0) mutateBulkDelete(ids);
        },
      }}
      withImage
      editModalRef={editModalRef as React.RefObject<HTMLDialogElement>}
    />
  );
};

const SupplierTable = () => {
  return (
    <TableProvider withPagination>
      <QueryTable />
    </TableProvider>
  );
};

export default SupplierTable;
