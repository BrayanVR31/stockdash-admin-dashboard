import { useFormContext, FieldErrors } from "react-hook-form";
import { Field, Input, InputGroup } from "@chakra-ui/react";
import { TbUser } from "react-icons/tb";
import { UserInputs } from "@/models/userSchema";

const UserName = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserInputs>();
  const fullErrors = errors as FieldErrors<
    Extract<
      UserInputs,
      {
        hasUsername: true;
      }
    >
  >;
  return (
    <Field.Root required invalid={!!fullErrors?.username}>
      <Field.Label>
        Nombre de usuario
        <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup startElement={<TbUser />}>
        <Input
          colorPalette="blue"
          {...register("username")}
          placeholder="Escribe el nombre de usuario"
        />
      </InputGroup>
      <Field.ErrorText>{fullErrors?.username?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default UserName;
