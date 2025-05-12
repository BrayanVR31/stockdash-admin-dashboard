import { Fieldset, HStack, RadioGroup } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { SaleInputs } from "@/models/saleSchema";

//"completed", "pending", "canceled"
const items = [
  { label: "Completado", value: "completed" },
  { label: "Pendiente", value: "pending" },
  { label: "Cancelado", value: "canceled" },
];

const statusColor: Record<string, string> = {
  completed: "green",
  pending: "blue",
  canceled: "red",
};

const Status = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SaleInputs>();
  return (
    <Fieldset.Root invalid={!!errors?.status}>
      <Fieldset.Legend>Status</Fieldset.Legend>
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <RadioGroup.Root
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            variant="outline"
          >
            <HStack gap="6">
              {items.map((item) => (
                <RadioGroup.Item
                  colorPalette={statusColor[item.value]}
                  key={item.value}
                  value={item.value}
                >
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        )}
      />
      {errors?.status && (
        <Fieldset.ErrorText>{errors?.status?.message}</Fieldset.ErrorText>
      )}
    </Fieldset.Root>
  );
};

export { Status };
