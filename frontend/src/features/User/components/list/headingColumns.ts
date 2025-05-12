import { HeadCol } from "@/types/table";

export const cols: HeadCol[] = [
  { path: ["profile.avatar.path", "email"], title: "Usuario", type: "avatar" },
  { path: "profile.name", title: "Nombre", type: "text" },
  { path: "profile.lastName", title: "Apellidos", type: "text" },
  {
    path: "rol",
    title: "Rol",
    type: "text",
  },
];
