import { Field, InputGroup, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { UserInputs } from "../userSchema";

const AuthEmail = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserInputs>();
  return (
    <Field.Root mb={4} required invalid={!!errors.email}>
      <Field.Label>
        Email
        <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup startElement={<MdOutlineEmail />}>
        <Input
          type="email"
          {...register("email")}
          placeholder="Escribe tu correo electrónico"
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
      <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { AuthEmail };
