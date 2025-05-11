import { useFormContext } from "react-hook-form";
import { Field, InputGroup } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { TbLockPassword } from "react-icons/tb";
import { UserInputs } from "@/models/userSchema";

const Email = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserInputs>();
  return (
    <Field.Root required invalid={!!errors?.password}>
      <Field.Label>
        Contraseña
        <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup startElement={<TbLockPassword />}>
        <PasswordInput
          {...register("password")}
          placeholder="Escribe tu contraseña"
        />
      </InputGroup>
      <Field.ErrorText>{errors?.password?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default Email;
