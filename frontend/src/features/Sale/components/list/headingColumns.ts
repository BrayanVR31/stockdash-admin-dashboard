import { HeadCol } from "@/types/table";

export const cols: HeadCol[] = [
  {
    path: ["products", "image"],
    title: "Productos",
    type: "stack-image",
    nestedType: "multiple",
    alternativePath: "name",
  },
  { path: "totalAmount", title: "Cantidad total", type: "text" },
  { path: "saleDate", title: "Fecha de venta", type: "human-date" },
  { path: "status", title: "Status", type: "sale-status" },
];
