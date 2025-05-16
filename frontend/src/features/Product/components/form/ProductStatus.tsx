import {
  Fieldset,
  HStack,
  RadioGroup,
  Field,
  Stack,
  NumberInput,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { ProductInputs } from "@/models/productSchema";

const items = [
  { label: "Activo", value: "1" },
  { label: "No activo", value: "2" },
];

const matchStatus: Record<string, boolean> = {
  "1": true,
  "2": false,
};

const matchValue: Record<string, string> = {
  true: "1",
  false: "2",
};

const castBoolToStr = (value: boolean) => (value ? "true" : "false");

const ProductStatus = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<ProductInputs>();
  return (
    <Stack
      gap={6}
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <Field.Root required invalid={!!errors?.quantity}>
        <Field.Label>
          Cantidad
          <Field.RequiredIndicator />
        </Field.Label>
        <NumberInput.Root width="full" defaultValue="0">
          <NumberInput.Control />
          <NumberInput.Input
            {...register("quantity", {
              valueAsNumber: true,
            })}
            placeholder="Cantidad"
          />
        </NumberInput.Root>
        <Field.ErrorText>{errors?.quantity?.message}</Field.ErrorText>
      </Field.Root>
      <Fieldset.Root>
        <Fieldset.Legend>Seleciona el status</Fieldset.Legend>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <RadioGroup.Root
              name={field.name}
              colorPalette="blue"
              variant="outline"
              value={matchValue[castBoolToStr(field.value)]}
              onValueChange={(e) => {
                const status = matchStatus[e.value!];
                field.onChange(status);
              }}
            >
              <HStack gap="6">
                {items.map((item) => (
                  <RadioGroup.Item key={item.value} value={item.value}>
                    <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                  </RadioGroup.Item>
                ))}
              </HStack>
            </RadioGroup.Root>
          )}
        />
      </Fieldset.Root>
    </Stack>
  );
};

export { ProductStatus };
