import { useFormContext } from "react-hook-form";
import { SupplierCreate } from "../supplierSchema";

const SupplierInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SupplierCreate>();
  return (
    <div className="card bg-navbar shadow-lg h-min">
      <div className="card-body">
        <h2 className="card-title pb-2 border-b border-gray-300">
          Información general
        </h2>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Nombre</label>
          <input
            className={`input ${errors.name ? "input-error" : "input-primary"}  w-full`}
            {...register("name")}
            placeholder="Escribe el nombre del proveedor"
          />
          {errors.name && (
            <p className="validator-hint text-error">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Imagen del proveedor</label>
          <input type="file" className="file-input file-input-primary w-full" />
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;
