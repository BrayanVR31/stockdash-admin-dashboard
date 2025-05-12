import { HeadingCol, TableLayout } from "@/components/table";
import { useUserList, useBulkUsers, useDestroyUser } from "@/hooks/useUser";
import { HeadCol } from "@/types/table";

export const cols: HeadCol[] = [
  { path: ["profile.avatar.path", "email"], title: "Email", type: "avatar" },
  { path: "profile.name", title: "Nombre", type: "text" },
  { path: "profile.lastName", title: "Apellidos", type: "text" },
  {
    path: "rol",
    title: "Rol",
    type: "text",
  },
];

const SuspenseTable = () => {
  const { data } = useUserList();
  const { mutate: destroyAll } = useBulkUsers();
  const { mutate: destroyUser } = useDestroyUser();
  console.log("suspensed: ", cols);
  return (
    <TableLayout
      totalItems={data.total}
      data={data.results}
      headingCols={cols}
      onBulkDeletion={(ids) => destroyAll(ids)}
      onDeleteItem={(id) => destroyUser(id)}
    />
  );
};

export default SuspenseTable;
