import { HeadCol } from "@/types/table";

export const cols: HeadCol[] = [
  {
    title: "Nombre",
    path: "name",
    type: "text",
  },
  {
    title: "Proveedor",
    path: "supplier.name",
    type: "text",
  },
  {
    title: "Precio total",
    path: "totalPrice",
    type: "price",
  },
  {
    title: "Cantidad total",
    path: "totalQuantity",
    type: "text",
  },
  {
    title: "Fecha de compra",
    path: "purchaseDate",
    type: "text",
  },
];
