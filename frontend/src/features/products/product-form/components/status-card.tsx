import { useFormContext, Controller } from "react-hook-form";
import { ProductForm } from "../form-schema";
import { SelectMenu } from "@/components/ui/select-menu";
import { Error } from "@/components/ui/custom-form";
import { FormCard, CardTitle } from "./form-card";

// Types
interface Option {
  value: boolean;
  label: string;
}

function StatusCard() {
  const {
    control,
    formState: { errors, isLoading, defaultValues },
  } = useFormContext<ProductForm>();
  const options: Option[] = [
    { value: true, label: "En venta" },
    { value: false, label: "No disponible" },
  ];

  if (isLoading) return <div>Loading...</div>;
  const defaultValue = options.find(
    (opt) => opt.value === defaultValues?.status,
  );

  return (
    <FormCard HeaderCard={Header} className="h-fit">
      <div className="relative mb-6">
        <Controller
          name="status"
          control={control}
          render={({ field: { onChange }, ...field }) => (
            <SelectMenu
              options={options}
              placeholder="Selecciona el status del producto..."
              {...field}
              onChange={(newValue) => {
                const changedValue = newValue as Option;
                onChange(changedValue.value);
              }}
              menuPlacement="top"
              defaultValue={defaultValue}
            />
          )}
        />
        <Error message={errors.status?.message} />
      </div>
    </FormCard>
  );
}

function Header() {
  return (
    <>
      <CardTitle>Status</CardTitle>
    </>
  );
}

export { StatusCard };
