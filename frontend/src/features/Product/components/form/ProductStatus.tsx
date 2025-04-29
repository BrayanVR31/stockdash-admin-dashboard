import {
  Fieldset,
  HStack,
  RadioGroup,
  Field,
  Input,
  Stack,
  NumberInput,
} from "@chakra-ui/react";
import { useState } from "react";

const items = [
  { label: "Activo", value: "1" },
  { label: "No activo", value: "2" },
];

const matchStatus: Record<string, boolean> = {
  "1": true,
  "2": false,
};

const ProductStatus = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Stack
      gap={6}
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <Field.Root required>
        <Field.Label>
          Cantidad
          <Field.RequiredIndicator />
        </Field.Label>
        <NumberInput.Root width="full" defaultValue="10">
          <NumberInput.Control />
          <NumberInput.Input placeholder="Cantidad" />
        </NumberInput.Root>
      </Field.Root>
      <Fieldset.Root>
        <Fieldset.Legend>Seleciona el status</Fieldset.Legend>
        <RadioGroup.Root
          colorPalette="purple"
          variant="outline"
          value={value}
          onValueChange={(e) => setValue(e.value!)}
        >
          <HStack gap="6">
            {items.map((item) => (
              <RadioGroup.Item key={item.value} value={item.value}>
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
      </Fieldset.Root>
    </Stack>
  );
};

export { ProductStatus };
