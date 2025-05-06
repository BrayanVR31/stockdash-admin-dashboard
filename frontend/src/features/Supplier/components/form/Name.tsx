import { Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { SupplierInputs } from "@/models/supplierSchema";

const Name = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SupplierInputs>();
  return (
    <Field.Root required invalid={!!errors?.name}>
      <Field.Label>
        Nombre
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        {...register("name")}
        placeholder="Escribe el nombre del proveedor"
      />
      <Field.ErrorText>{errors?.name?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { Name };
