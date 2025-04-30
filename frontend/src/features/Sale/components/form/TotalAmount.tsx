import { Field, InputGroup, NumberInput } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { SaleInputs } from "@/models/saleSchema";

const TotalAmount = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SaleInputs>();
  return (
    <Field.Root required invalid={!!errors?.totalAmount}>
      <Field.Label>
        Cantidad total
        <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup startAddon="$" endAddon="MX">
        <NumberInput.Root w="full">
          <NumberInput.Control />
          <NumberInput.Input
            {...register("totalAmount", { valueAsNumber: true })}
            placeholder="Escribe la cantidad total"
          />
        </NumberInput.Root>
      </InputGroup>
      <Field.ErrorText>{errors?.totalAmount?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { TotalAmount };
