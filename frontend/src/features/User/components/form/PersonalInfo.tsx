import { useFormContext, FieldErrors } from "react-hook-form";
import { Flex, Input, Text, Field, Stack } from "@chakra-ui/react";
import { UserInputs } from "@/models/userSchema";

const PersonalInfo = () => {
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
    <Flex direction="column" gapY="5">
      <Text fontWeight="semibold" fontSize="md">
        Personal Information
      </Text>
      <Stack direction="row" gap="5">
        <Field.Root invalid={!!fullErrors.profile?.name}>
          <Field.Label>Name</Field.Label>
          <Input {...register("profile.name")} placeholder="Enter name" />
          <Field.ErrorText>{fullErrors.profile?.name?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!fullErrors.profile?.lastName}>
          <Field.Label>Last Name</Field.Label>
          <Input
            {...register("profile.lastName")}
            placeholder="Enter last name"
          />
          <Field.ErrorText>
            {fullErrors.profile?.lastName?.message}
          </Field.ErrorText>
        </Field.Root>
      </Stack>
    </Flex>
  );
};

export default PersonalInfo;
