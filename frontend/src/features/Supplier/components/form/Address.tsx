import { Field, Input, Flex, Checkbox, Stack, HStack } from "@chakra-ui/react";
import {
  useFormContext,
  useWatch,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { SupplierInputs } from "@/models/supplierSchema";

const Address = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<SupplierInputs>();
  const hasAddress = useWatch({
    control,
    name: "hasAddress",
  });
  const fullErrors = errors as FieldErrors<
    Extract<
      SupplierInputs,
      {
        hasAddress: true;
      }
    >
  >;
  return (
    <Flex direction="column" gapY="5">
      <Controller
        control={control}
        name="hasAddress"
        render={({ field }) => (
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={(e) => field.onChange(!!e.checked)}
            variant="solid"
            colorPalette="purple"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>¿Desea agregar la dirección?</Checkbox.Label>
          </Checkbox.Root>
        )}
      />

      {hasAddress && (
        <>
          <Stack
            direction={{
              base: "column",
              md: "row",
            }}
            gap="5"
          >
            <Field.Root invalid={!!fullErrors?.address?.street}>
              <Field.Label>Calle</Field.Label>
              <Input
                {...register("address.street")}
                placeholder="Escribe tu calle"
              />
              <Field.ErrorText>
                {fullErrors?.address?.street?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!fullErrors?.address?.state}>
              <Field.Label>Estado</Field.Label>
              <Input
                {...register("address.state")}
                placeholder="Escribe tu ciudad"
              />
              <Field.ErrorText>
                {fullErrors?.address?.state?.message}
              </Field.ErrorText>
            </Field.Root>
          </Stack>
          <Stack
            direction={{
              base: "column",
              md: "row",
            }}
            gap="5"
          >
            <Field.Root invalid={!!fullErrors?.address?.neighborhood}>
              <Field.Label>Colonia</Field.Label>
              <Input
                {...register("address.neighborhood")}
                placeholder="Escribe tu estado"
              />
              <Field.ErrorText>
                {fullErrors?.address?.neighborhood?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!fullErrors?.address?.zipCode}>
              <Field.Label>Código postal</Field.Label>
              <Input
                {...register("address.zipCode")}
                type="number"
                placeholder="Escribe tu código postal"
              />
              <Field.ErrorText>
                {fullErrors?.address?.zipCode?.message}
              </Field.ErrorText>
            </Field.Root>
          </Stack>
        </>
      )}
    </Flex>
  );
};

export { Address };
