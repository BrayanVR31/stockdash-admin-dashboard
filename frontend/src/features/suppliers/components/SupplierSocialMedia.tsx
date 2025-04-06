import { useEffect } from "react";
import {
  useFormContext,
  useWatch,
  useFieldArray,
  FieldErrors,
} from "react-hook-form";
import { Link, Trash, Plus } from "lucide-react";
import { SupplierCreate } from "../supplierSchema";

const SupplierSocialMedia = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SupplierCreate>();
  const hasSocialMedia = useWatch({ control, name: "hasSocialMedia" });
  const { fields, replace, remove, append } = useFieldArray({
    control,
    name: "socialMedia",
  });
  const fullErrors = errors as FieldErrors<
    Extract<
      SupplierCreate,
      {
        hasSocialMedia: true;
      }
    >
  >;
  useEffect(() => {
    if (hasSocialMedia) replace([{ url: "" }]);
  }, [hasSocialMedia, replace]);
  return (
    <div className="card bg-navbar shadow-lg">
      <div className="card-body">
        <h2 className="card-title pb-2 border-b border-gray-300">
          Redes sociales del proveedor
        </h2>
        <fieldset className="fieldset">
          <label className="fieldset-label">
            <input
              {...register("hasSocialMedia")}
              type="checkbox"
              className="checkbox checkbox-primary"
            />
            ¿Deseas agregar alguna red social?
          </label>
        </fieldset>
        {/** Show list of social media list */}
        {hasSocialMedia && (
          <>
            {fields.map((field, index) => (
              <fieldset key={field.id} className="fieldset">
                <legend className="fieldset-legend">URL</legend>
                <div className="flex">
                  <label
                    className={`input w-full ${fullErrors.socialMedia?.[index]?.url ? "input-error" : "input-primary"}`}
                  >
                    <Link className="w-3.5" />
                    <input
                      {...register(`socialMedia.${index}.url`)}
                      type="url"
                      placeholder="https://"
                    />
                  </label>
                  {fields[index + 1] ? (
                    <div
                      onClick={() => remove(index)}
                      className="btn btn-square ml-4 bg-red-600 hover:bg-red-600/80 text-white"
                    >
                      <Trash className="w-4" />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        append({
                          url: "",
                        })
                      }
                      className="btn btn-square ml-4 bg-green-700 hover:bg-green-700/80 text-white"
                    >
                      <Plus className="w-4" />
                    </div>
                  )}
                </div>

                {fullErrors.socialMedia?.[index]?.url && (
                  <p className="validator-hint text-error">
                    {fullErrors.socialMedia?.[index]?.url?.message}
                  </p>
                )}
              </fieldset>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SupplierSocialMedia;
