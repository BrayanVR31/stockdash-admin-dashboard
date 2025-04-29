import {
  useFormContext,
  useWatch,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { Flex, Field, Checkbox, Textarea } from "@chakra-ui/react";
import { ProductInputs } from "@/models/productSchema";

const ProductDescription = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProductInputs>();
  const hasDescription = useWatch({
    control,
    name: "hasDescription",
  });
  const fullErrors = errors as FieldErrors<
    Extract<
      ProductInputs,
      {
        hasDescription: true;
      }
    >
  >;
  return (
    <Flex direction="column" gapY="5">
      <Controller
        control={control}
        name="hasDescription"
        render={({ field }) => (
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={(e) => field.onChange(!!e.checked)}
            variant="solid"
            colorPalette="purple"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>¿Desea agregar una descripción?</Checkbox.Label>
          </Checkbox.Root>
        )}
      />

      {hasDescription && (
        <Field.Root invalid={!!fullErrors?.description}>
          <Field.Label>Descripción</Field.Label>
          <Textarea {...register("description")} autoresize />
          <Field.HelperText>
            Agrega una breve descripción del producto.
          </Field.HelperText>
          <Field.ErrorText>{fullErrors?.description?.message}</Field.ErrorText>
        </Field.Root>
      )}
    </Flex>
  );
};

export { ProductDescription };
