import { Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { ProductInputs } from "@/models/productSchema";

const ProductName = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductInputs>();
  return (
    <Field.Root required invalid={!!errors?.name}>
      <Field.Label>
        Nombre
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        {...register("name")}
        placeholder="Escribe el nombre de producto"
      />
      <Field.ErrorText>{errors?.name?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { ProductName };
