import { Controller, useFormContext } from "react-hook-form";
import { ProductForm } from "../form-schema";
import { useCategory } from "@/hooks";
import { Error } from "@/components/ui/custom-form";
import { SelectMenu, Option } from "@/components/ui/select-menu";

function CategoryCard() {
  const {
    control,
    formState: { errors, defaultValues },
  } = useFormContext<ProductForm>();
  const { getList: categories } = useCategory();
  const options: Option<string>[] | undefined = categories.isFetching
    ? []
    : categories.data.results.map((category) => ({
        label: category.name,
        value: category._id,
      }));
  const defaultValue = options.filter((opt) =>
    defaultValues?.categories?.includes(opt.value),
  );
  console.log(defaultValues?.categories);
  return (
    <>
      <Controller
        name="categories"
        control={control}
        render={({ field: { onChange }, ...field }) => (
          <SelectMenu
            isMulti
            options={options}
            defaultValue={defaultValue}
            placeholder="Selecciona una categoría..."
            {...field}
            onChange={(newValue) => {
              const changedValue = newValue as Option<string>[];
              onChange(changedValue.map((category) => category.value));
            }}
          />
        )}
      />
      <Error message={errors.categories?.message} />
    </>
  );
}

export default CategoryCard;
