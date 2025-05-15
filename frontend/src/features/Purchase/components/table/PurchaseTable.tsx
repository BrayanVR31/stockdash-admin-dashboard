import { usePurchaseList } from "@/hooks/usePurchase";
import { TableLayout } from "@/components/table";
import { cols } from "./columns";

const PurchaseTable = () => {
  const { data } = usePurchaseList();
  return (
    <TableLayout
      onBulkDeletion={() => null}
      onDeleteItem={() => null}
      totalItems={data.total}
      headingCols={cols}
      data={data.results}
    />
  );
};

export { PurchaseTable };
