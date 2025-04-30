import { Field, Input, Flex, Checkbox } from "@chakra-ui/react";
import {
  useFormContext,
  useWatch,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { SaleInputs } from "@/models/saleSchema";

const SaleTime = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<SaleInputs>();
  const hasSaleDate = useWatch({
    control,
    name: "hasSaleDate",
  });
  const fullErrors = errors as FieldErrors<
    Extract<
      SaleInputs,
      {
        hasSaleDate: true;
      }
    >
  >;
  return (
    <Flex direction="column" gapY="5">
      <Controller
        control={control}
        name="hasSaleDate"
        render={({ field }) => (
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={(e) => field.onChange(!!e.checked)}
            variant="solid"
            colorPalette="purple"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>¿Desea agregar la fecha de venta?</Checkbox.Label>
          </Checkbox.Root>
        )}
      />

      {hasSaleDate && (
        <Field.Root invalid={!!fullErrors?.saleDate}>
          <Field.Label>Fecha de venta</Field.Label>
          <Input
            type="date"
            {...register("saleDate", {
              valueAsDate: true,
            })}
          />
          <Field.HelperText>Registra la fecha de venta.</Field.HelperText>
          <Field.ErrorText>{fullErrors?.saleDate?.message}</Field.ErrorText>
        </Field.Root>
      )}
    </Flex>
  );
};

export { SaleTime };
