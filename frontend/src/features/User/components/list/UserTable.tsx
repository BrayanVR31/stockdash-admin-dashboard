import { useUserList, useDestroyUser } from "@/hooks/useUser";
import { TableLayout } from "@/components/table";
import LoadingOverlaySpinner from "@/components/ui/loading-overlay-spinner";
import { cols } from "./headingColumns";

const UserTable = () => {
  const { data } = useUserList();
  const destroyItem = useDestroyUser();
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

export { UserTable };
