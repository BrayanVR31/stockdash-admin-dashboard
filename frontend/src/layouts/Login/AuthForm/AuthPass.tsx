import { Field, InputGroup } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { TbLockPassword } from "react-icons/tb";
import {
  PasswordStrengthMeter,
  PasswordInput,
} from "@/components/ui/password-input";
import { UserInputs } from "../userSchema";

const getStrengthPass = (length: number): number => {
  /**
    minValue < 8 it's weak -> 1
    minValue === 8 it's medium -> 2
    minValue > 8 it's high -> 4
  */
  if (length < 8) return 1;
  if (length > 8 && length <= 12) return 3;
  if (length > 12) return 4;
  return 2;
};

const AuthPass = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<UserInputs>();
  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });
  const passValue = getStrengthPass(password.length);
  return (
    <Field.Root mb={6} required invalid={!!errors.password}>
      <Field.Label>
        Password
        <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup startElement={<TbLockPassword />}>
        <PasswordInput
          {...register("password")}
          placeholder="Escribe tu contraseña"
          bg={{
            _light: "gray.50",
            _dark: "gray.700",
          }}
          borderColor={{
            _dark: "gray.300",
            _light: "gray.600",
          }}
        />
      </InputGroup>
      {/**
        4 => 100%  |
        pass < 8 it's weak -> 1
        pass === 8 it's medium -> 2
        pass >= 8 it's high -> 4 */}
      <PasswordStrengthMeter mt={1} width="full" value={passValue} />
      <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { AuthPass };
