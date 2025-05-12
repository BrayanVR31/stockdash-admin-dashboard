import { HeadCol } from "@/types/table";

export const cols: HeadCol[] = [
  { path: ["images", "name"], title: "Producto", type: "images" },
  { path: "price.purchase", title: "Precio de compra", type: "text" },
  { path: "price.sale", title: "Precio de venta", type: "text" },
  { path: "quantity", title: "Cantidad", type: "text" },
];
