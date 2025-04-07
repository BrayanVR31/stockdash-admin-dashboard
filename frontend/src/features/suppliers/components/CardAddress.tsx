import { useFormContext, useWatch, FieldErrors } from "react-hook-form";
import { SupplierCreate } from "../supplierSchema";

const CardAddress = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<SupplierCreate>();
  const hasAddress = useWatch({ control, name: "hasAddress" });
  const fullErrors = errors as FieldErrors<
    Extract<
      SupplierCreate,
      {
        hasAddress: true;
      }
    >
  >;
  return (
    <div className="mt-6">
      <fieldset className="fielset mb-4">
        <label className="fieldset-label">
          <input
            {...register("hasAddress")}
            type="checkbox"
            className="checkbox checkbox-primary"
          />
          ¿Desea agregar la dirección del proveedor?
        </label>
      </fieldset>
      {hasAddress && (
        <div className="flex flex-col">
          <div className="flex gap-8 mb-4 max-[800px]:flex-col">
            <fieldset className="fieldset flex-1">
              <legend className="fieldset-legend">Estado</legend>
              <input
                {...register("address.state")}
                className={`input w-full ${fullErrors.address?.state ? "input-error" : "input-primary"}`}
                placeholder="Escribe el estado del proveedor"
              />
              {fullErrors.address?.state && (
                <p className="validator-hint text-error">
                  {fullErrors.address.state.message}
                </p>
              )}
            </fieldset>
            <fieldset className="fieldset flex-1">
              <legend className="fieldset-legend">Calle</legend>
              <input
                {...register("address.street")}
                className={`input w-full ${fullErrors.address?.street ? "input-error" : "input-primary"}`}
                placeholder="Escribe la calle del proveedor"
              />
              {fullErrors.address?.street && (
                <p className="validator-hint text-error">
                  {fullErrors.address.street.message}
                </p>
              )}
            </fieldset>
          </div>
          <div className="flex gap-8 max-[800px]:flex-col">
            <fieldset className="fieldset flex-1">
              <legend className="fieldset-legend">Colonia</legend>
              <input
                {...register("address.neighborhood")}
                className={`input w-full ${fullErrors.address?.neighborhood ? "input-error" : "input-primary"}`}
                placeholder="Escribe la colonia del proveedor"
              />
              {fullErrors.address?.neighborhood && (
                <p className="validator-hint text-error">
                  {fullErrors.address.neighborhood.message}
                </p>
              )}
            </fieldset>
            <fieldset className="fieldset flex-1">
              <legend className="fieldset-legend">Código postal</legend>
              <input
                type="number"
                {...register("address.zipCode")}
                className={`input w-full ${fullErrors.address?.zipCode ? "input-error" : "input-primary"}`}
                placeholder="Escribe el código postal del proveedor"
              />
              {fullErrors.address?.zipCode && (
                <p className="validator-hint text-error">
                  {fullErrors.address.zipCode.message}
                </p>
              )}
            </fieldset>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAddress;
