import { Plus } from "lucide-react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Header from "@/components/Header";
import SupplierAddress from "../components/SupplierAddress";
import SupplierContact from "../components/SupplierContact";
import SupplierInfo from "../components/SupplierInfo";
import SupplierSocialMedia from "../components/SupplierSocialMedia";
import { NavLink } from "react-router";
import { supplierSchema, SupplierCreate } from "../supplierSchema";
import { useCreateSupplier } from "@/hooks/useSupplier";
import { memoryToken } from "@/services/stockdashService";
import Notification from "@/components/notification";

const SuppliersAdd = () => {
  const methods = useForm({
    resolver: zodResolver(supplierSchema),
  });
  const { mutate, isSuccess } = useCreateSupplier();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SupplierCreate> = (data) => {
    console.log(memoryToken.refresh);
    console.log("submitting...");
    console.log("data:", data);
    mutate(data, {
      onSuccess: () => {
        toast.custom(
          (t) => (
            <Notification
              onClose={() => {
                toast.dismiss(t.id);
              }}
              isVisible={t.visible}
              type="success"
            >
              Registro exitoso
            </Notification>
          ),
          { duration: 5_00 },
        );
        navigate("../");
      },
    });
  };
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
      <FormProvider {...methods}>
        <form
          id="supplier-add"
          className="grid grid-cols-2 grid-rows-(--form-rows) gap-x-8 gap-y-6"
          onSubmit={methods.handleSubmit(onSubmit, (e) => console.log(e))}
        >
          <SupplierInfo />
          <SupplierAddress />
          <SupplierContact />
          <SupplierSocialMedia />
        </form>
      </FormProvider>
    </main>
  );
};

export { SuppliersAdd };
