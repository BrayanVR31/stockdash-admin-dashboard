import { Field, InputGroup, Stack, NumberInput } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { ProductInputs } from "@/models/productSchema";

const ProductPrice = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductInputs>();
  return (
    <Stack
      direction={{
        base: "column",
        md: "row",
      }}
      gap={6}
    >
      <Field.Root required invalid={!!errors?.price?.sale}>
        <Field.Label>
          Precio de venta
          <Field.RequiredIndicator />
        </Field.Label>
        <InputGroup startAddon="$" endAddon="MX">
          <NumberInput.Root w="full">
            <NumberInput.Control />
            <NumberInput.Input
              {...register("price.sale", { valueAsNumber: true })}
              placeholder="Escribe el precio de venta"
            />
          </NumberInput.Root>
        </InputGroup>
        <Field.ErrorText>{errors?.price?.sale?.message}</Field.ErrorText>
      </Field.Root>
      <Field.Root required invalid={!!errors?.price?.purchase}>
        <Field.Label>
          Precio de compra
          <Field.RequiredIndicator />
        </Field.Label>
        <InputGroup startAddon="$" endAddon="MX">
          <NumberInput.Root w="full">
            <NumberInput.Control />
            <NumberInput.Input
              {...register("price.purchase", { valueAsNumber: true })}
              placeholder="Escribe el precio de compra"
            />
          </NumberInput.Root>
        </InputGroup>
        <Field.ErrorText>{errors?.price?.purchase?.message}</Field.ErrorText>
      </Field.Root>
    </Stack>
  );
};

export { ProductPrice };
