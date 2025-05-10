import { useFormContext, FieldErrors } from "react-hook-form";
import { Flex, Input, Text, Field, Stack } from "@chakra-ui/react";
import { UserInputs } from "@/models/userSchema";

type TargetedProfile = Pick<
  Extract<
    UserInputs,
    {
      hasProfile: true;
    }
  >,
  "profile"
>;

type AddressProfile = Extract<
  TargetedProfile["profile"],
  {
    hasAddress: true;
  }
>;

type TmpAddress = {
  profile: AddressProfile;
};

const Address = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserInputs>();
  const fullErrors = errors as FieldErrors<TmpAddress>;
  return (
    <Flex direction="column" gapY="5">
      <Text fontWeight="semibold" fontSize="md">
        Dirección
      </Text>
      <Stack direction="row" gap="5">
        <Field.Root invalid={!!fullErrors.profile?.address?.street}>
          <Field.Label>Street</Field.Label>
          <Input
            {...register("profile.address.street")}
            placeholder="Enter street"
          />
          <Field.ErrorText>
            {fullErrors.profile?.address?.street?.message}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!fullErrors.profile?.address?.city}>
          <Field.Label>City</Field.Label>
          <Input
            {...register("profile.address.city")}
            placeholder="Enter city"
          />
          <Field.ErrorText>
            {fullErrors.profile?.address?.city?.message}
          </Field.ErrorText>
        </Field.Root>
      </Stack>
    </Flex>
  );
};

export default Address;
