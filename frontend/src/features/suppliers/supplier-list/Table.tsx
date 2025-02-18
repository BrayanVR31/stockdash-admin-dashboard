import { DashboardTable, Paginator } from "@/components/ui/dashboard-table";
import { useSuspenseSupplierList } from "@/hooks/use-supplier";

const Table = () => {
  const { data } = useSuspenseSupplierList();
  return (
    <>
      <DashboardTable
        data={data.results}
        headerCols={["Nombre", "Email", "Teléfono"]}
        objectKeys={["name", "contact.email", "contact[phoneNumber]"]}
      />
      <Paginator total={data.total} />
    </>
  );
};

export default Table;
