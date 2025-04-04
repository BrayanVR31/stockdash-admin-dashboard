import { useFormContext } from "react-hook-form";
import { SupplierCreate } from "../supplierSchema";

const SupplierContact = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SupplierCreate>();
  return (
    <div className="card bg-navbar shadow-lg">
      <div className="card-body">
        <h2 className="card-title pb-2 border-b border-gray-300">
          Contacto del proveedor
        </h2>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Email</label>
          <input
            className={`input ${errors.contact?.email ? "input-error" : "input-primary"}  w-full`}
            {...register("contact.email")}
            placeholder="Escribe el email del proveedor"
          />
          {errors?.contact?.email && (
            <p className="validator-hint text-error">
              {errors.contact.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Teléfono</label>
          <input
            className={`input ${errors.contact?.phoneNumber ? "input-error" : "input-primary"}  w-full`}
            {...register("contact.phoneNumber")}
            placeholder="Escribe el número telefónico del proveedor"
          />
          {errors?.contact?.phoneNumber && (
            <p className="validator-hint text-error">
              {errors.contact.phoneNumber.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierContact;
