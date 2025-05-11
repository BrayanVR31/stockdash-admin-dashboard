import { useFormContext } from "react-hook-form";
import { Field, Input, InputGroup } from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { UserInputs } from "@/models/userSchema";

const Email = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserInputs>();
  return (
    <Field.Root required invalid={!!errors?.email}>
      <Field.Label>
        Email
        <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup startElement={<HiOutlineMail />}>
        <Input {...register("email")} placeholder="email@example.com" />
      </InputGroup>
      <Field.ErrorText>{errors?.email?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default Email;
