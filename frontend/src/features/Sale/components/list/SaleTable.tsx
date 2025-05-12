import { useSaleList, useDestroySale } from "@/hooks/useSale";
import { TableLayout } from "@/components/table";
import { cols } from "./headingColumns";

const SaleTable = () => {
  const { data } = useSaleList();
  const { mutate: destroy } = useDestroySale();
  return (
    <TableLayout
      data={data.results}
      headingCols={cols}
      totalItems={data.total}
      onBulkDeletion={() => null}
      onDeleteItem={(id) => {
        destroy(id);
      }}
    />
  );
};

export { SaleTable };
