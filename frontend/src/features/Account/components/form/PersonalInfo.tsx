import { useFormContext, Controller } from "react-hook-form";
import { Input, Text, Field, Stack, Badge, Checkbox } from "@chakra-ui/react";
import { UserInputs } from "@/models/userSchema";

const PersonalInfo = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<UserInputs>();
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
      <Controller
        control={control}
        name="hasUsername"
        render={({ field }) => (
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={(e) => field.onChange(!!e.checked)}
            variant="solid"
            colorPalette="blue"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              ¿Desea agregar el nombre de usuario?
            </Checkbox.Label>
          </Checkbox.Root>
        )}
      />
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
