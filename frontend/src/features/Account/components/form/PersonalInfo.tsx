import { useFormContext, useWatch } from "react-hook-form";
import { Input, Text, Field, Stack, Badge } from "@chakra-ui/react";
import { AccountInputs } from "@/models/accountSchema";

const PersonalInfo = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<AccountInputs>();
  const isAdmin = useWatch({
    control,
    name: "isAdmin",
  });
  return (
    <Stack direction="column" gap="6">
      <Text
        textAlign={{
          base: "center",
          md: "start",
        }}
        fontWeight="normal"
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
        <Field.Root
          disabled={!isAdmin}
          required
          invalid={!!errors.profile?.name}
        >
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
        <Field.Root
          disabled={!isAdmin}
          required
          invalid={!!errors.profile?.lastName}
        >
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
                <Badge colorPalette="blue" size="xs" variant="surface">
                  Opcional
                </Badge>
              }
            />
          </Field.Label>
          <Input
            disabled={!isAdmin}
            {...register("profile.username")}
            placeholder="Escribe el nombre de usuario"
          />
          <Field.ErrorText>{errors.profile?.username?.message}</Field.ErrorText>
        </Field.Root>
      </Stack>
    </Stack>
  );
};

export default PersonalInfo;
