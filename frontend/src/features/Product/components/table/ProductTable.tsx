import { useProductList } from "@/hooks/useProduct";
import { TableLayout } from "@/components/table";
import { cols } from "./columns";

const ProductTable = () => {
  const { data } = useProductList();
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

export { ProductTable };
