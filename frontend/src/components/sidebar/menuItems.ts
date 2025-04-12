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
  parentUrl?: string;
  subMenu?: {
    subTitle: string;
    url: string;
  }[];
}

export const menuItems: MenuItems[] = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    parentUrl: "dashboard",
  },
  {
    title: "Productos",
    icon: PackageOpen,
    parentUrl: "products",
    subMenu: [
      { subTitle: "Listar", url: "/dashboard/products" },
      { subTitle: "Crear", url: "/dashboard/products/form" },
    ],
  },
  {
    title: "Proveedores",
    icon: Factory,
    parentUrl: "suppliers",
    subMenu: [
      { subTitle: "Listar", url: "/dashboard/suppliers" },
      { subTitle: "Crear", url: "/dashboard/suppliers/form" },
    ],
  },
  {
    title: "Ventas",
    icon: HandCoins,
    parentUrl: "sales",
    subMenu: [
      { subTitle: "Listar", url: "/dashboard/sales" },
      { subTitle: "Crear", url: "/dashboard/sales/form" },
    ],
  },
  {
    title: "Compras",
    icon: ShoppingCart,
    parentUrl: "purchases",
    subMenu: [
      { subTitle: "Listar", url: "/dashboard/purchases" },
      { subTitle: "Crear", url: "/dashboard/purchases/form" },
    ],
  },
  {
    title: "Usuarios",
    icon: Users,
    parentUrl: "users",
    subMenu: [
      { subTitle: "Listar", url: "/dashboard/users" },
      { subTitle: "Crear", url: "/dashboard/users/form" },
    ],
  },
  {
    title: "Configuraciones",
    icon: Settings,
  },
];
