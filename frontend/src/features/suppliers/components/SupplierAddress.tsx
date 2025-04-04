import { useFormContext } from "react-hook-form";
import { SupplierCreate } from "../supplierSchema";

const SupplierAddress = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SupplierCreate>();
  return (
    <div className="card bg-navbar row-span-2 shadow-lg">
      <div className="card-body">
        <h2 className="card-title pb-2 border-b border-gray-300">
          Dirección del proveedor
        </h2>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Calle</label>
          <input
            className={`input ${errors.address?.street ? "input-error" : "input-primary"}  w-full`}
            {...register("address.street")}
            placeholder="Escribe la calle del proveedor"
          />
          {errors.address?.street && (
            <p className="validator-hint text-error">
              {errors.address?.street?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Estado</label>
          <input
            className={`input ${errors.address?.state ? "input-error" : "input-primary"}  w-full`}
            {...register("address.state")}
            placeholder="Escribe el estado del proveedor"
          />
          {errors.address?.state && (
            <p className="validator-hint text-error">
              {errors.address?.state?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Código postal</label>
          <input
            type="number"
            className={`input ${errors.address?.zipCode ? "input-error" : "input-primary"}  w-full`}
            {...register("address.zipCode")}
            placeholder="Escribe el código postal del proveedor"
          />
          {errors.address?.zipCode && (
            <p className="validator-hint text-error">
              {errors.address?.zipCode?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Colonia</label>
          <input
            className={`input ${errors.address?.neighborhood ? "input-error" : "input-primary"}  w-full`}
            {...register("address.neighborhood")}
            placeholder="Escribe la colonia del proveedor"
          />
          {errors.address?.neighborhood && (
            <p className="validator-hint text-error">
              {errors.address?.neighborhood?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierAddress;
