import { useFormContext } from "react-hook-form";
import { Flex, Input, Text, Field, Stack, Badge } from "@chakra-ui/react";
import { AccountInputs } from "../../models/accountSchema";

const PersonalInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountInputs>();
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
        Información personal
      </Text>
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        gap="5"
      >
        <Field.Root required invalid={!!errors.profile?.name}>
          <Field.Label>
            Nombre
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            {...register("profile.name")}
            placeholder="Escribe tu nombre"
          />
          <Field.ErrorText>{errors.profile?.name?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root required invalid={!!errors.profile?.lastName}>
          <Field.Label>
            Apellidos
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            {...register("profile.lastName")}
            placeholder="Escribe tus apellidos"
          />
          <Field.ErrorText>{errors.profile?.lastName?.message}</Field.ErrorText>
        </Field.Root>
      </Stack>
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        gap="5"
      >
        <Field.Root invalid={!!errors.profile?.username}>
          <Field.Label>
            Nombre de usuario
            <Field.RequiredIndicator
              fallback={
                <Badge size="xs" variant="surface">
                  Opcional
                </Badge>
              }
            />
          </Field.Label>
          <Input
            {...register("profile.username")}
            placeholder="Escribe tus nombre de usuario"
          />
          <Field.ErrorText>{errors.profile?.username?.message}</Field.ErrorText>
        </Field.Root>
      </Stack>
    </Flex>
  );
};

export default PersonalInfo;
