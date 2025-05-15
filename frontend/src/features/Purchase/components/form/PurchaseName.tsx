import { Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { PurchaseInputs } from "@/models/purchaseSchema";

const PurchaseName = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PurchaseInputs>();
  return (
    <Field.Root required invalid={!!errors?.name}>
      <Field.Label>
        Nombre
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        {...register("name")}
        placeholder="Escribe el nombre de la compra"
      />
      <Field.ErrorText>{errors?.name?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { PurchaseName };
