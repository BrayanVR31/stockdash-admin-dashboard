import { useFormContext, useWatch, FieldErrors } from "react-hook-form";
import { Mail, Phone } from "lucide-react";
import { SupplierCreate } from "../supplierSchema";

const CardContact = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<SupplierCreate>();
  const hasContact = useWatch({ control, name: "hasContact" });
  const fullErrors = errors as FieldErrors<
    Extract<
      SupplierCreate,
      {
        hasContact: true;
      }
    >
  >;
  return (
    <div className="mt-6">
      <fieldset className="fielset mb-4">
        <label className="fieldset-label">
          <input
            {...register("hasContact")}
            type="checkbox"
            className="checkbox checkbox-primary"
          />
          ¿Desea agregar un contacto?
        </label>
      </fieldset>
      {hasContact && (
        <div className="flex gap-8 max-[800px]:flex-col">
          <fieldset className="fieldset flex-1">
            <legend className="fieldset-legend">Email</legend>
            <label
              className={`input w-full ${fullErrors.contact?.email ? "input-error" : "input-primary"}`}
            >
              <Mail className="w-4.5" />
              <input
                {...register("contact.email")}
                placeholder="Escribe el email del proveedor"
              />
            </label>
            {fullErrors.contact?.email && (
              <p className="validator-hint text-error">
                {fullErrors.contact.email.message}
              </p>
            )}
          </fieldset>
          <fieldset className="fieldset flex-1">
            <legend className="fieldset-legend">Teléfono</legend>
            <div
              className={`input w-full ${fullErrors.contact?.phoneNumber ? "input-error" : "input-primary"}`}
            >
              <Phone className="w-4.5" />
              <input
                {...register("contact.phoneNumber")}
                placeholder="Escribe el teléfono del proveedor"
              />
            </div>
            {fullErrors.contact?.phoneNumber && (
              <p className="validator-hint text-error">
                {fullErrors.contact.phoneNumber.message}
              </p>
            )}
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default CardContact;
