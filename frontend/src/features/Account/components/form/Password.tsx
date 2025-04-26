import { useFormContext } from "react-hook-form";
import { Flex, InputGroup, Text, Field, Stack } from "@chakra-ui/react";
import { TbLockPassword } from "react-icons/tb";
import { PasswordInput } from "@/components/ui/password-input";
import { AccountInputs } from "../../models/accountSchema";

const Password = () => {
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
        Contraseña
      </Text>
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        gap="5"
      >
        <Field.Root invalid={!!errors?.password}>
          <Field.Label>Contraseña actual</Field.Label>
          <InputGroup startElement={<TbLockPassword />}>
            <PasswordInput
              autoComplete="new-password"
              {...register("password")}
              placeholder="Escribe tu contraseña"
            />
          </InputGroup>
          <Field.ErrorText>{errors?.password?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors?.newPassword}>
          <Field.Label>Nueva contraseña</Field.Label>
          <InputGroup startElement={<TbLockPassword />}>
            <PasswordInput
              autoComplete="off"
              {...register("newPassword")}
              placeholder="Nueva contraseña"
            />
          </InputGroup>
          <Field.ErrorText>{errors?.newPassword?.message}</Field.ErrorText>
        </Field.Root>
      </Stack>
    </Flex>
  );
};

export default Password;
