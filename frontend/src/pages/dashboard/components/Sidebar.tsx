import { NavLink } from "react-router";
import { AiOutlineHome } from "react-icons/ai";
import { LuStore } from "react-icons/lu";
import { AiOutlineFileAdd } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegRectangleList } from "react-icons/fa6";
import {
  MdGroups2,
  MdOutlineChevronLeft,
  MdOutlineAccountCircle,
} from "react-icons/md";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { TbCapture } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { AccordionMenu } from ".";

export function Sidebar() {
  // TODO: Make sidebar responsive on collapse state (style)
  return (
    <aside
      data-dashboard-sidebar
      className={`bg-slate-100 sticky top-0 left-0 overflow-x-hidden max-h-screen w-full`}
    >
      <div className="h-full p-5">
        <div className=" h-14 flex items-center justify-between mb-8">
          <Logo />
          <label className="cursor-pointer rounded-full flex items-center justify-center w-6 h-6 border border-slate-400">
            <input
              className="peer appearance-none hidden "
              type="checkbox"
              data-collapse-btn
            />
            <MdOutlineChevronLeft className="text-slate-700 peer-checked:rotate-180 transition-transform" />
          </label>
        </div>
        {/** Menu list */}
        <div className="flex min-h-[calc(100vh-108px)] pb-5 flex-col justify-between">
          <div>
            <h5 className="font-semibold text-sm uppercase mb-4 text-slate-700">
              Resumen
            </h5>
            {/** Dashboard list */}
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) => `${getLinkClassName(isActive)}`}
                  to="."
                >
                  <AiOutlineHome className="text-lg  group[data-dashboard-sidebar='hide-sidebar']:hidden" />
                  <span className="text-sm">Dashboard</span>
                </NavLink>
              </li>
            </ul>
            {/** Operation list */}
            <ul>
              <li>
                <AccordionMenu
                  contentButton={
                    <>
                      <LuStore className="text-lg group[.hide-sidebar]:hidden" />
                      <span className="text-sm">Productos</span>
                    </>
                  }
                >
                  <NavLink
                    className={({ isActive }) =>
                      `${getLinkClassName(isActive)}`
                    }
                    to="./products"
                  >
                    <AiOutlineFileAdd className="text-lg" />
                    <span className="text-sm">Crear</span>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `${getLinkClassName(isActive)}`
                    }
                    to="./products/create"
                  >
                    <FaRegRectangleList className="text-lg" />
                    <span className="text-sm">Listar</span>
                  </NavLink>
                </AccordionMenu>
              </li>
              <li>
                <AccordionMenu
                  contentButton={
                    <>
                      <TiShoppingCart className="text-lg" />
                      <span className="text-sm">Compras</span>
                    </>
                  }
                >
                  <NavLink
                    className={({ isActive }) =>
                      `${getLinkClassName(isActive)}`
                    }
                    to="./purchases/create"
                  >
                    <AiOutlineFileAdd className="text-lg" />
                    <span className="text-sm">Crear</span>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `${getLinkClassName(isActive)}`
                    }
                    to="./purchases"
                  >
                    <FaRegRectangleList className="text-lg" />
                    <span className="text-sm">Listar</span>
                  </NavLink>
                </AccordionMenu>
              </li>
              <li>
                <AccordionMenu
                  contentButton={
                    <>
                      <MdGroups2 className="text-lg" />
                      <span className="text-sm">Proveedores</span>
                    </>
                  }
                >
                  <NavLink
                    className={({ isActive }) =>
                      `${getLinkClassName(isActive)}`
                    }
                    to="./suppliers/create"
                  >
                    <AiOutlineFileAdd className="text-lg" />
                    <span className="text-sm">Crear</span>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `${getLinkClassName(isActive)}`
                    }
                    to="./suppliers"
                  >
                    <FaRegRectangleList className="text-lg" />
                    <span className="text-sm">Listar</span>
                  </NavLink>
                </AccordionMenu>
              </li>
              <li>
                <AccordionMenu
                  contentButton={
                    <>
                      <BiPurchaseTagAlt className="text-lg" />
                      <span className="text-sm">Ventas</span>
                    </>
                  }
                >
                  <NavLink
                    className={({ isActive }) =>
                      `${getLinkClassName(isActive)}`
                    }
                    to="./suppliers/create"
                  >
                    <AiOutlineFileAdd className="text-lg" />
                    <span className="text-sm">Crear</span>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `${getLinkClassName(isActive)}`
                    }
                    to="./suppliers"
                  >
                    <FaRegRectangleList className="text-lg" />
                    <span className="text-sm">Listar</span>
                  </NavLink>
                </AccordionMenu>
              </li>
            </ul>
          </div>
          <div className="mt-12">
            <h5 className="font-semibold text-sm uppercase mb-4 text-slate-700">
              Sistema
            </h5>
            {/** Dashboard list */}
            <ul>
              <li className="mb-2">
                <NavLink
                  className={({ isActive }) => `${getLinkClassName(isActive)}`}
                  to="./account/settings"
                >
                  <FiSettings className="text-lg" />
                  <span className="text-sm">Configuraciones</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => `${getLinkClassName(isActive)}`}
                  to="./account/settings"
                >
                  <VscAccount className="text-lg" />
                  <span className="text-sm">Cuenta de usuario</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

function getLinkClassName(isActive: boolean): string {
  const redirectClassName = `bg-transparent text-slate-800 py-3 px-5 flex hover:bg-blue-500/15 hover:text-blue-600 font-medium rounded-lg items-center gap-x-3`;
  return `${redirectClassName} ${isActive && "bg-blue-500/15 text-blue-600"}`;
}

function Logo() {
  return (
    <div className="flex items-center gap-x-3">
      <div className="w-9 h-9  rounded-full bg-blue-700 flex items-center justify-center text-white -outline-offset-4 outline outline-1 outline-white">
        <TbCapture className="text-lg rotate-45" />
      </div>
      <span className="font-bold text-blue-700 text-xl">Stockdash</span>
    </div>
  );
}
