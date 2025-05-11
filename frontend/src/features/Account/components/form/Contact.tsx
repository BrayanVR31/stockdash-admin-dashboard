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
} from "@chakra-ui/react";
import { AccountInputs } from "@/models/accountSchema";

type Profile = Pick<AccountInputs, "profile">;
type ProfileContact = Extract<Profile["profile"], { hasContact: true }>;

const Contact = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AccountInputs>();
  const hasContact = useWatch({
    control,
    name: "profile.hasContact",
  });
  const isAdmin = useWatch({
    control,
    name: "isAdmin",
  });
  const fullErrors = errors as FieldErrors<{ profile: ProfileContact }>;
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
        name="profile.hasContact"
        render={({ field }) => (
          <Checkbox.Root
            disabled={!isAdmin}
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
          <Field.Root
            disabled={!isAdmin}
            invalid={!!fullErrors?.profile?.phoneNumber}
          >
            <Field.Label>Número de teléfono</Field.Label>
            <InputGroup startElement="+52">
              <Input
                {...register("profile.phoneNumber")}
                placeholder="Escribe tu teléfono"
              />
            </InputGroup>
            <Field.ErrorText>
              {fullErrors?.profile?.phoneNumber?.message}
            </Field.ErrorText>
          </Field.Root>
        </HStack>
      )}
    </Flex>
  );
};

export default Contact;
