import {
  PaginatorSkeleton,
  TableSkeleton,
} from "@/components/ui/dashboard-skeleton";

const SupplierSkeleton = () => {
  return (
    <>
      <TableSkeleton cells={5} headingRows={["Nombre", "Email", "Teléfono"]} />
      <div className="py-4">
        <PaginatorSkeleton />
      </div>
    </>
  );
};

export default SupplierSkeleton;
