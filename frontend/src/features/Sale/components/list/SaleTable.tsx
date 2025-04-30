import { useSaleList } from "@/hooks/useSale";
import { TableLayout } from "@/components/table";
import { cols } from "./headingColumns";

const SaleTable = () => {
  const { data } = useSaleList();
  return (
    <TableLayout
      data={data.results}
      headingCols={cols}
      totalItems={data.total}
      onBulkDeletion={() => null}
      onDeleteItem={() => null}
    />
  );
};

export { SaleTable };
