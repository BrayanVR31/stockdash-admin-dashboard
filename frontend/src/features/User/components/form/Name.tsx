import { useFormContext, FieldErrors } from "react-hook-form";
import { Field, Input } from "@chakra-ui/react";
import { UserInputs } from "@/models/userSchema";

const Name = () => {
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
    <Field.Root required invalid={!!fullErrors?.profile?.name}>
      <Field.Label>
        Nombre de usuario
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        colorPalette="blue"
        {...register("profile.name")}
        placeholder="Escribe el nombre"
      />
      <Field.ErrorText>{fullErrors?.profile?.name?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default Name;
