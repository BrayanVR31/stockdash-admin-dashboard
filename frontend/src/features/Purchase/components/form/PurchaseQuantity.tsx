import { Field, NumberInput } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { PurchaseInputs } from "@/models/purchaseSchema";

const PurchaseQuantity = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PurchaseInputs>();
  return (
    <Field.Root required invalid={!!errors?.totalQuantity}>
      <Field.Label>
        Cantidad total
        <Field.RequiredIndicator />
      </Field.Label>
      <NumberInput.Root w="full">
        <NumberInput.Control />
        <NumberInput.Input
          {...register("totalQuantity", { valueAsNumber: true })}
          placeholder="Escribe la cantidad total"
        />
      </NumberInput.Root>
      <Field.ErrorText>{errors?.totalQuantity?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { PurchaseQuantity };
