import {
  Gauge,
  Boxes,
  ListFilter,
  ListFilterPlus,
  Handshake,
  ShoppingCart,
  HandCoins,
} from "lucide-react";

type IconType = typeof Gauge;

interface MenuItems {
  title: string;
  url: string;
  icon: IconType;
}

const generalMenu: MenuItems[] = [
  { title: "Dashboard", url: "#", icon: Gauge },
];

interface MenuSubItems extends Omit<MenuItems, "url"> {
  subItems: MenuItems[];
}

const mainMenu: MenuSubItems[] = [
  {
    title: "Productos",
    icon: Boxes,
    subItems: [
      {
        title: "Listar",
        url: "products",
        icon: ListFilter,
      },
      {
        title: "Crear",
        url: "products/create",
        icon: ListFilterPlus,
      },
    ],
  },
  {
    title: "Proveedores",
    icon: Handshake,
    subItems: [
      {
        title: "Listar",
        url: "suppliers",
        icon: ListFilter,
      },
      {
        title: "Crear",
        url: "suppliers/create",
        icon: ListFilterPlus,
      },
    ],
  },
  {
    title: "Compras",
    icon: ShoppingCart,
    subItems: [
      {
        title: "Listar",
        url: "#",
        icon: ListFilter,
      },
      {
        title: "Crear",
        url: "#",
        icon: ListFilterPlus,
      },
    ],
  },
  {
    title: "Ventas",
    icon: HandCoins,
    subItems: [
      {
        title: "Listar",
        url: "#",
        icon: ListFilter,
      },
      {
        title: "Crear",
        url: "#",
        icon: ListFilterPlus,
      },
    ],
  },
];

export { generalMenu, mainMenu };
