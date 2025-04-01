import {
  LucideIcon,
  LayoutGrid,
  PackageOpen,
  Factory,
  HandCoins,
  ShoppingCart,
  Settings,
  Users,
} from "lucide-react";

interface MenuItems {
  title: string;
  icon: LucideIcon;
  subMenu?: {
    subTitle: string;
    url: string;
  }[];
}

export const menuItems: MenuItems[] = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Productos",
    icon: PackageOpen,
    subMenu: [
      { subTitle: "Listar", url: "/dashboard/products" },
      { subTitle: "Crear", url: "/dashboard/products/create" },
    ],
  },
  {
    title: "Proveedores",
    icon: Factory,
    subMenu: [
      { subTitle: "Listar", url: "/dashboard/suppliers" },
      { subTitle: "Crear", url: "/dashboard/suppliers/create" },
    ],
  },
  {
    title: "Ventas",
    icon: HandCoins,
    subMenu: [
      { subTitle: "Listar", url: "/dashboard/sales" },
      { subTitle: "Crear", url: "/dashboard/sales/create" },
    ],
  },
  {
    title: "Compras",
    icon: ShoppingCart,
    subMenu: [
      { subTitle: "Listar", url: "/dashboard/purchases" },
      { subTitle: "Crear", url: "/dashboard/purchases/create" },
    ],
  },
  {
    title: "Usuarios",
    icon: Users,
    subMenu: [
      { subTitle: "Listar", url: "/dashboard/users" },
      { subTitle: "Crear", url: "/dashboard/users/create" },
    ],
  },
  {
    title: "Configuraciones",
    icon: Settings,
  },
];
