import { Field, InputGroup, NumberInput } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { PurchaseInputs } from "@/models/purchaseSchema";

const PurchasePrice = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PurchaseInputs>();
  return (
    <Field.Root required invalid={!!errors?.totalPrice}>
      <Field.Label>
        Precio total
        <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup startAddon="$" endAddon="MX">
        <NumberInput.Root w="full">
          <NumberInput.Control />
          <NumberInput.Input
            {...register("totalPrice", { valueAsNumber: true })}
            placeholder="Escribe el precio total"
          />
        </NumberInput.Root>
      </InputGroup>
      <Field.ErrorText>{errors?.totalPrice?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { PurchasePrice };
