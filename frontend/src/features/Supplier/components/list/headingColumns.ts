import { HeadCol } from "@/types/table";

export const cols: HeadCol[] = [
  { path: ["image.path", "contact.email"], title: "Proveedor", type: "avatar" },
  { path: "name", title: "Nombre", type: "text" },
  { path: "contact.phoneNumber", title: "Teléfono", type: "text" },
];
