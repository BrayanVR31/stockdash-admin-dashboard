import { useFormContext } from "react-hook-form";
import { SupplierCreate } from "../supplierSchema";

const SupplierSocialMedia = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SupplierCreate>();
  return (
    <div className="card bg-navbar shadow-lg">
      <div className="card-body">
        <h2 className="card-title pb-2 border-b border-gray-300">
          Redes sociales del proveedor
        </h2>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Facebook</label>
          <input
            className={`input ${errors.socialMedia?.facebook ? "input-error" : "input-primary"}  w-full`}
            {...register("socialMedia.facebook")}
            placeholder="Escribe el url de facebook"
          />
          {errors.socialMedia?.facebook && (
            <p className="validator-hint text-error">
              {errors.socialMedia.facebook.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Tiktok</label>
          <input
            className={`input ${errors.socialMedia?.tiktok ? "input-error" : "input-primary"}  w-full`}
            {...register("socialMedia.tiktok")}
            placeholder="Escribe el url de tiktok"
          />
          {errors.socialMedia?.tiktok && (
            <p className="validator-hint text-error">
              {errors.socialMedia.tiktok.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="mb-1">Instagram</label>
          <input
            className={`input ${errors.socialMedia?.twitter ? "input-error" : "input-primary"}  w-full`}
            {...register("socialMedia.twitter")}
            placeholder="Escribe el url de twitter"
          />
          {errors.socialMedia?.twitter && (
            <p className="validator-hint text-error">
              {errors.socialMedia.twitter.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierSocialMedia;
