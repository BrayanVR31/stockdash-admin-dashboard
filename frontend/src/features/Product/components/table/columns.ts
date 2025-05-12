import { HeadCol } from "@/types/table";

export const cols: HeadCol[] = [
  { path: ["images", "name"], title: "Producto", type: "images" },
  { path: "price.purchase", title: "Precio de compra", type: "price" },
  { path: "price.sale", title: "Precio de venta", type: "price" },
  { path: "quantity", title: "Cantidad", type: "text" },
  { path: "status", title: "Status", type: "status" },
];
