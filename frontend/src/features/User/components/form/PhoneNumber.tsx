import { useFormContext, FieldErrors } from "react-hook-form";
import { Field, Input, InputGroup } from "@chakra-ui/react";
import { FiPhone } from "react-icons/fi";
import { UserInputs } from "@/models/userSchema";

const PhoneNumber = () => {
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
    <Field.Root required invalid={!!fullErrors?.profile?.phoneNumber}>
      <Field.Label>
        Número de teléfono
        <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup startElement={<FiPhone />}>
        <Input
          {...register("profile.phoneNumber")}
          placeholder="Escribe el número de teléfono"
        />
      </InputGroup>
      <Field.ErrorText>
        {fullErrors?.profile?.phoneNumber?.message}
      </Field.ErrorText>
    </Field.Root>
  );
};

export default PhoneNumber;
