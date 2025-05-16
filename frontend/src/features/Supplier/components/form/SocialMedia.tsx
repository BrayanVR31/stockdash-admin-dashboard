import {
  Field,
  Input,
  InputGroup,
  Flex,
  Checkbox,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useEffect } from "react";
import {
  useFormContext,
  useWatch,
  Controller,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import { SupplierInputs } from "@/models/supplierSchema";
import { FiTrash } from "react-icons/fi";
import { RiAddLine } from "react-icons/ri";

const SocialMedia = () => {
  const {
    register,
    formState: { errors, defaultValues },
    control,
  } = useFormContext<SupplierInputs>();
  const hasSocialMedia = useWatch({
    control,
    name: "hasSocialMedia",
  });
  const fullErrors = errors as FieldErrors<
    Extract<
      SupplierInputs,
      {
        hasSocialMedia: true;
      }
    >
  >;
  const { fields, replace, remove, append } = useFieldArray({
    control,
    name: "socialMedia",
  });
  useEffect(() => {
    if (hasSocialMedia) {
      const defaultStatus = defaultValues?.hasSocialMedia
        ? (defaultValues as Extract<SupplierInputs, { hasSocialMedia: true }>)
            .socialMedia
        : [{ url: "" }];
      replace(defaultStatus);
    }
  }, [hasSocialMedia, replace, defaultValues]);
  return (
    <Flex direction="column" gapY="8">
      <Controller
        control={control}
        name="hasSocialMedia"
        render={({ field }) => (
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={(e) => field.onChange(!!e.checked)}
            variant="solid"
            colorPalette="blue"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>¿Desea agregar alguna red social?</Checkbox.Label>
          </Checkbox.Root>
        )}
      />

      {hasSocialMedia && (
        <>
          <VStack gap="10">
            {fields.map((field, index) => (
              <HStack w="full" key={field.id}>
                <Field.Root invalid={!!fullErrors?.socialMedia?.[index]?.url}>
                  <InputGroup startAddon="https://">
                    <Input
                      placeholder="sitioweb.com"
                      {...register(`socialMedia.${index}.url`)}
                    />
                  </InputGroup>
                  <Field.ErrorText position="absolute" bottom="-6">
                    {fullErrors?.socialMedia?.[index]?.url?.message}
                  </Field.ErrorText>
                </Field.Root>
                {fields[index + 1] ? (
                  <IconButton
                    onClick={() => remove(index)}
                    aria-label="Remove url social media"
                    colorPalette="red"
                    type="button"
                  >
                    <FiTrash />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() =>
                      append({
                        url: "",
                      })
                    }
                    type="button"
                    colorPalette="green"
                    aria-label="Add new url social media"
                  >
                    <RiAddLine />
                  </IconButton>
                )}
              </HStack>
            ))}
          </VStack>
        </>
      )}
    </Flex>
  );
};

export { SocialMedia };
