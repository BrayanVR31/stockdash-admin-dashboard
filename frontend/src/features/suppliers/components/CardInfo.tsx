import { useFormContext } from "react-hook-form";
import { SupplierCreate } from "../supplierSchema";

const CardInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SupplierCreate>();
  return (
    <div className="flex gap-8 max-[800px]:flex-col">
      <fieldset className="fieldset flex-1">
        <legend className="fieldset-legend">Nombre</legend>
        <input
          {...register("name")}
          className={`input w-full ${errors.name ? "input-error" : "input-primary"}`}
          placeholder="Escribe el nombre del proveedor"
        />
        {errors.name && (
          <p className="validator-hint text-error">{errors.name.message}</p>
        )}
      </fieldset>
      <fieldset className="fieldset flex-1">
        <legend className="fieldset-legend">Imagen</legend>
        <input
          {...register("image")}
          type="file"
          className={`file-input w-full ${errors.image ? "file-input-error" : "file-input-primary"}`}
          placeholder="Escribe el nombre del proveedor"
        />
        {errors.image && (
          <p className="validator-hint text-error">{errors.image.message}</p>
        )}
      </fieldset>
    </div>
  );
};

export default CardInfo;
