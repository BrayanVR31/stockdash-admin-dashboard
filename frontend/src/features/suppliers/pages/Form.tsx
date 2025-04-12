import { Plus } from "lucide-react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Header from "@/components/Header";
import CardInfo from "../components/CardInfo";
import CardAddress from "../components/CardAddress";
import CardContact from "../components/CardContact";
import CardSocialMedia from "../components/CardSocialMedia";
import { NavLink } from "react-router";
import {
  supplierSchema,
  SupplierCreate,
  SupplierAddress,
  SupplierContact,
  SupplierSocialMedia,
  defaultSupplier,
} from "../supplierSchema";
import { useCreateSupplier } from "@/hooks/useSupplier";
import { memoryToken } from "@/services/stockdashService";
import Notification from "@/components/notification";
import { Supplier } from "@/types/supplier";

interface Props {
  supplier?: Supplier;
}

const Form = ({ supplier }: Props) => {
  const defaultAddress: SupplierAddress = supplier?.address
    ? {
        hasAddress: true,
        address: {
          zipCode: `${supplier.address.zipCode}`,
          neighborhood: supplier.address.neighborhood,
          state: supplier.address.state,
          street: supplier.address.street,
        },
      }
    : { hasAddress: false };
  const defaultContact: SupplierContact = supplier?.contact
    ? {
        hasContact: true,
        contact: {
          email: supplier.contact.email,
          phoneNumber: supplier.contact.phoneNumber,
        },
      }
    : { hasContact: false };
  const defaultSocialMedia: SupplierSocialMedia = supplier?.socialMedia
    ? {
        hasSocialMedia: true,
        socialMedia: supplier.socialMedia,
      }
    : {
        hasSocialMedia: false,
      };
  const defaultValue: SupplierCreate = !supplier
    ? defaultSupplier
    : {
        name: supplier.name,
        ...defaultAddress,
        ...defaultContact,
        ...defaultSocialMedia,
        image: supplier.image?._id || null,
      };
  const methods = useForm<SupplierCreate>({
    resolver: zodResolver(supplierSchema),
    defaultValues: defaultValue,
  });
  const {
    register,
    formState: { errors },
  } = methods;
  const { mutate, isSuccess } = useCreateSupplier();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SupplierCreate> = (data) => {
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
              <span>{supplier ? "Editar" : "Agregar"}</span>
            </button>
          </>
        }
      />
      <FormProvider {...methods}>
        <form
          className=""
          id="supplier-add"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="card bg-layer rounded-box border border-gray-400/70">
            <div className="card-body w-[85%] self-center">
              <h4 className="card-title">Detalles de proveedor</h4>
              <CardInfo />
              <CardContact />
              <CardAddress />
              <CardSocialMedia />
            </div>
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export { Form };
