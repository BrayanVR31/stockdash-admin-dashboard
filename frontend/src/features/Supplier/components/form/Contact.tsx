import {
  useFormContext,
  useWatch,
  FieldErrors,
  Controller,
} from "react-hook-form";
import {
  Flex,
  Input,
  Text,
  Field,
  HStack,
  Checkbox,
  InputGroup,
  Badge,
} from "@chakra-ui/react";
import { SupplierInputs } from "@/models/supplierSchema";

const Contact = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SupplierInputs>();
  const hasContact = useWatch({
    control,
    name: "hasContact",
  });
  const fullErrors = errors as FieldErrors<
    Extract<SupplierInputs, { hasContact: true }>
  >;
  return (
    <Flex direction="column" gapY="5">
      <Text
        textAlign={{
          base: "center",
          md: "start",
        }}
        fontWeight="semibold"
        fontSize="md"
      >
        Contacto
      </Text>
      <Controller
        control={control}
        name="hasContact"
        render={({ field }) => (
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={(e) => field.onChange(!!e.checked)}
            variant="solid"
            colorPalette="purple"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              ¿Desea agregar la información de contacto?
            </Checkbox.Label>
          </Checkbox.Root>
        )}
      />

      {hasContact && (
        <HStack spaceX="5">
          <Field.Root invalid={!!fullErrors?.contact?.phoneNumber}>
            <Field.Label>
              Número de teléfono
              <Field.RequiredIndicator
                fallback={
                  <Badge colorPalette="purple" size="xs" variant="surface">
                    Opcional
                  </Badge>
                }
              />
            </Field.Label>
            <InputGroup startElement="+52">
              <Input
                {...register("contact.phoneNumber")}
                placeholder="Escribe el teléfono"
              />
            </InputGroup>
            <Field.ErrorText>
              {fullErrors?.contact?.phoneNumber?.message}
            </Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!fullErrors?.contact?.email}>
            <Field.Label>
              Email
              <Field.RequiredIndicator
                fallback={
                  <Badge colorPalette="purple" size="xs" variant="surface">
                    Opcional
                  </Badge>
                }
              />
            </Field.Label>
            <InputGroup startElement="+52">
              <Input
                {...register("contact.email")}
                placeholder="Escribe el email"
              />
            </InputGroup>
            <Field.ErrorText>
              {fullErrors?.contact?.email?.message}
            </Field.ErrorText>
          </Field.Root>
        </HStack>
      )}
    </Flex>
  );
};

export { Contact };
