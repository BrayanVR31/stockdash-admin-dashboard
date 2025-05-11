import { useFormContext, FieldErrors } from "react-hook-form";
import { Field, Input } from "@chakra-ui/react";
import { UserInputs } from "@/models/userSchema";

const Lastname = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserInputs>();
  const fullErrors = errors as FieldErrors<
    Extract<
      UserInputs,
      {
        hasProfile: true;
      }
    >
  >;
  return (
    <Field.Root required invalid={!!fullErrors?.profile?.lastName}>
      <Field.Label>
        Apellidos de usuario
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        colorPalette="blue"
        {...register("profile.lastName")}
        placeholder="Escribe los apellidos"
      />
      <Field.ErrorText>
        {fullErrors?.profile?.lastName?.message}
      </Field.ErrorText>
    </Field.Root>
  );
};

export default Lastname;
