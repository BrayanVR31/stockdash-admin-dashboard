import { useSupplierList, useDestroySupplier } from "@/hooks/useSupplier";
import { TableLayout } from "@/components/table";
import LoadingOverlaySpinner from "@/components/ui/loading-overlay-spinner";
import { cols } from "./headingColumns";

const SupplierTable = () => {
  const { data } = useSupplierList();
  const destroyItem = useDestroySupplier();
  return (
    <>
      <TableLayout
        data={data.results}
        headingCols={cols}
        totalItems={data.total}
        onBulkDeletion={() => null}
        onDeleteItem={(id) => destroyItem.mutate(id)}
      />
      {destroyItem.isPending && (
        <LoadingOverlaySpinner message="Eliminado elemento" />
      )}
    </>
  );
};

export { SupplierTable };
