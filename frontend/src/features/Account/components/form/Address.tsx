import {
  useFormContext,
  useWatch,
  Controller,
  FieldErrors,
} from "react-hook-form";
import {
  Flex,
  Input,
  Text,
  Field,
  HStack,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { AccountInputs } from "../../models/accountSchema";

type Profile = Pick<AccountInputs, "profile">;
type ProfileAddress = Extract<Profile["profile"], { hasAddress: true }>;

const Address = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AccountInputs>();
  const hasAddress = useWatch({
    control,
    name: "profile.hasAddress",
  });
  const fullErrors = errors as FieldErrors<{ profile: ProfileAddress }>;
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
        Dirección
      </Text>
      <Controller
        control={control}
        name="profile.hasAddress"
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
            <Field.Root invalid={!!fullErrors?.profile?.address?.state}>
              <Field.Label>Calle</Field.Label>
              <Input
                {...register("profile.address.street")}
                placeholder="Escribe tu calle"
              />
              <Field.ErrorText>
                {fullErrors?.profile?.address?.state?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!fullErrors?.profile?.address?.state}>
              <Field.Label>Ciudad</Field.Label>
              <Input
                {...register("profile.address.city")}
                placeholder="Escribe tu ciudad"
              />
              <Field.ErrorText>
                {fullErrors?.profile?.address?.city?.message}
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
            <Field.Root invalid={!!fullErrors?.profile?.address?.state}>
              <Field.Label>Estado</Field.Label>
              <Input
                {...register("profile.address.state")}
                placeholder="Escribe tu estado"
              />
              <Field.ErrorText>
                {fullErrors?.profile?.address?.state?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!fullErrors?.profile?.address?.zipCode}>
              <Field.Label>Código postal</Field.Label>
              <Input
                {...register("profile.address.zipCode")}
                type="number"
                placeholder="Escribe tu código postal"
              />
              <Field.ErrorText>
                {fullErrors?.profile?.address?.zipCode?.message}
              </Field.ErrorText>
            </Field.Root>
          </Stack>
          <HStack spaceX="5">
            <Field.Root invalid={!!fullErrors?.profile?.address?.country}>
              <Field.Label>País</Field.Label>
              <Input
                {...register("profile.address.country")}
                placeholder="Escribe tu país"
              />
              <Field.ErrorText>
                {fullErrors?.profile?.address?.country?.message}
              </Field.ErrorText>
            </Field.Root>
          </HStack>
        </>
      )}
    </Flex>
  );
};

export default Address;
