import { useFormContext } from "react-hook-form";
import { Upload } from "lucide-react";
import { SupplierCreate } from "../supplierSchema";
import UploadModal from "@/components/modal/UploadModal";
import { useEffect } from "react";

const CardInfo = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<SupplierCreate>();
  return (
    <div className="flex gap-8 max-[800px]:flex-col">
      <fieldset className="fieldset flex-1">
        <legend className="fieldset-legend">Nombre</legend>
        <input
          {...register("name")}
          className={`input w-full ${
            errors.name ? "input-error" : "input-primary"
          }`}
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
          className="hidden"
          placeholder="Escribe el nombre del proveedor"
        />
        <UploadModal
          onUpload={(files) => {
            const fileRefs = files.map((file) => file?.refId);
            console.log(files);
            setValue("image", fileRefs.find((id) => id) || null);
          }}
        />
        {errors.image && (
          <p className="validator-hint text-error">{errors.image.message}</p>
        )}
      </fieldset>
    </div>
  );
};

export default CardInfo;
