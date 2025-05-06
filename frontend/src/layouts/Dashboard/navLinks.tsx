import { JSX } from "react";
import { LuFactory, LuLayoutDashboard } from "react-icons/lu";
import { BsBoxes } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";

type SidebarLink = {
  to: string;
  label: string;
  icon: JSX.Element;
  isMain?: boolean;
  subItems?: {
    to: string;
    label: string;
  }[];
};

const navLinks: SidebarLink[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
    isMain: true,
    icon: <LuLayoutDashboard size={16} />,
  },
  {
    to: "/dashboard/suppliers",
    label: "Proveedores",
    icon: <LuFactory size={16} />,
    subItems: [
      { to: "create", label: "Crear" },
      { to: "", label: "Listar" },
    ],
  },
  {
    to: "/dashboard/products",
    label: "Productos",
    icon: <BsBoxes size={16} />,
    subItems: [
      { to: "create", label: "Crear" },
      { to: "", label: "Listar" },
    ],
  },
  {
    to: "/dashboard/sales",
    label: "Ventas",
    icon: <TbPigMoney size={16} />,
    subItems: [
      { to: "create", label: "Crear" },
      { to: "", label: "Listar" },
    ],
  },
  {
    to: "/dashboard/purchases",
    label: "Compras",
    icon: <MdOutlineShoppingCart size={16} />,
    subItems: [
      { to: "create", label: "Crear" },
      { to: "", label: "Listar" },
    ],
  },
  {
    to: "/dashboard/users",
    label: "Usuarios",
    icon: <PiUsersThree size={16} />,
    subItems: [
      { to: "create", label: "Crear" },
      { to: "", label: "Listar" },
    ],
  },
];

export default navLinks;
