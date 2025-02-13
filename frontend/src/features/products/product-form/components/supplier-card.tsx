import { Controller, useFormContext } from "react-hook-form";
import { ProductForm } from "../form-schema";
import { SelectMenu, Option } from "@/components/ui/select-menu";
import { Error } from "@/components/ui/custom-form";
import { useSupplier } from "@/hooks";

function SupplierCard() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductForm>();
  const { getList: suppliers } = useSupplier();
  const options: Option<string>[] | undefined = suppliers.data?.results.map(
    (supplier) => ({
      value: supplier._id,
      label: supplier.name,
    }),
  );
  return (
    <>
      <Controller
        name="suppliers"
        control={control}
        render={({ field: { onChange }, ...field }) => (
          <SelectMenu
            isMulti
            options={options}
            placeholder="Selecciona un proveedor..."
            {...field}
            onChange={(newValue) => {
              const changedValue = newValue as Option<string>[];
              onChange(changedValue.map((category) => category.value));
            }}
          />
        )}
      />
      <Error message={errors.suppliers?.message} />
    </>
  );
}

export default SupplierCard;
