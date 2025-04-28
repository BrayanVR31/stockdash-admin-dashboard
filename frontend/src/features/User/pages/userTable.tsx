import { HeadingCol, TableLayout } from "@/components/table";
import { useUserList, useBulkUsers, useDestroyUser } from "@/hooks/useUser";

export const cols: HeadingCol[] = [
  { path: "email", content: "Email" },
  { path: "profile.name", content: "Nombre" },
  { path: "profile.lastName", content: "Apellidos" },
  {
    path: "rol",
    content: "Rol",
  },
];

const SuspenseTable = () => {
  const { data } = useUserList();
  const { mutate: destroyAll } = useBulkUsers();
  const { mutate: destroyUser } = useDestroyUser();

  return (
    <TableLayout
      totalItems={data.total}
      data={data.results}
      pathKey="_id"
      headingCols={cols}
      onBulkDeletion={(ids) => destroyAll(ids)}
      onDeleteItem={(id) => destroyUser(id)}
    />
  );
};

export default SuspenseTable;
