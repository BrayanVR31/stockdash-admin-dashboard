import { Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { PurchaseInputs } from "@/models/purchaseSchema";

const PurchaseDate = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PurchaseInputs>();

  return (
    <Field.Root required invalid={!!errors?.purchaseDate}>
      <Field.Label>
        Fecha de compra
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        type="date"
        {...register("purchaseDate", { required: "Este campo es requerido" })}
      />
      <Field.ErrorText>{errors?.purchaseDate?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { PurchaseDate };
