import { Plus } from "lucide-react";
import Header from "@/components/Header";
import SupplierAddress from "../components/SupplierAddress";
import SupplierContact from "../components/SupplierContact";
import SupplierInfo from "../components/SupplierInfo";
import SupplierSocialMedia from "../components/SupplierSocialMedia";
import { NavLink } from "react-router";

const SuppliersAdd = () => {
  return (
    <main>
      <Header
        title="Registrar proveedor"
        description="Agrega toda la información de un proveedor aquí."
        leftSide={
          <>
            <NavLink to=".." className="btn btn-soft mr-4">
              Cancelar
            </NavLink>
            <button
              type="submit"
              form="supplier-add"
              className="btn btn-primary"
            >
              <Plus className="w-4" />
              <span>Agregar</span>
            </button>
          </>
        }
      />
      <form
        id="supplier-add"
        className="grid grid-cols-2 grid-rows-(--form-rows) gap-x-8 gap-y-6"
      >
        <SupplierInfo />
        <SupplierAddress />
        <SupplierContact />
        <SupplierSocialMedia />
      </form>
    </main>
  );
};

export { SuppliersAdd };
