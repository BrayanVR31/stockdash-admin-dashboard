import { useSupplierList, useDeleteSupplier } from "@/hooks/useSupplier";
import Table from "@/components/table";

const SupplierTable = () => {
  const { data } = useSupplierList();
  const { mutate } = useDeleteSupplier();
  /*
  const items = Array(Math.ceil(data.total / pagination.perPage)).fill(0);*/
  return (
    <>
      <Table
        totalItems={data.total}
        headerCols={["Nombre", "Email", "Teléfono"]}
        data={data.results}
        objectKeys={["name", "contact.email", "contact.phoneNumber"]}
        action={{
          onDelete: (id) => {
            mutate(id);
          },
          onEdit: () => console.log("edit"),
        }}
      />
    </>
  );
};

/*
<button className="join-item btn">1</button>
<button className="join-item btn btn-primary">2</button>
<button className="join-item btn btn-disabled">...</button>
<button className="join-item btn">99</button>
<button className="join-item btn">100</button>
*/

export default SupplierTable;
