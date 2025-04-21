import { ColHeading } from "@/components/table/types";
import { Column } from "@/components/table";

const headings: ColHeading[] = [
  {
    path: "name",
    content: (
      <Column
        path="name"
        title="Nombre"
        colConfig={{
          sortable: true,
        }}
      />
    ),
    hasFilter: true,
  },
  {
    path: "contact.email",
    content: (
      <Column
        path="contact.email"
        title="Email"
        colConfig={{
          sortable: true,
        }}
      />
    ),
    hasFilter: true,
  },

  {
    path: "contact.phoneNumber",
    content: (
      <Column
        path="contact.phoneNumber"
        title="Número de teléfono"
        colConfig={{
          sortable: true,
        }}
      />
    ),
    hasFilter: true,
  },
  {
    path: "createdAt",
    content: (
      <Column
        path="createdAt"
        title="Fecha agregada"
        colConfig={{
          sortable: true,
        }}
      />
    ),
    hasFilter: true,
  },
  {
    path: "deletedAt",
    content: (
      <Column
        path="deletedAt"
        title="Status"
        colConfig={{
          sortable: true,
        }}
      />
    ),
    hasFilter: true,
  },
];

export default headings;
