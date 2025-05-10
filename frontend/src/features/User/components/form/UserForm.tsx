import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Stack,
  StackSeparator,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { userSchema, UserInputs, defaultUser } from "@/models/userSchema";
import { useCreateUser, useUpdateUser, useFetchUser } from "@/hooks/userUser";
import PersonalInfo from "./PersonalInfo";
import Address from "./Address";
import Avatar from "./Avatar";

interface UserFormProps {
  mode: "create" | "edit";
  userId?: string; // Required for edit mode
}

const UserForm = ({ mode, userId }: UserFormProps) => {
  const { data: userData, isLoading } = useFetchUser(userId, {
    enabled: mode === "edit",
  });
  const methods = useForm<UserInputs>({
    resolver: zodResolver(userSchema),
    mode: "all",
    defaultValues: mode === "edit" ? userData : defaultUser,
  });

  const { mutate: createUser, isLoading: isCreating } = useCreateUser();
  const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    if (mode === "edit") {
      updateUser({ id: userId, ...data });
    } else {
      createUser(data);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FormProvider {...methods}>
      <Flex direction="column" gap={6}>
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
          <Stack gapY="5" separator={<StackSeparator />}>
            <Checkbox
              isChecked={methods.watch("hasProfile")}
              onChange={(e) => methods.setValue("hasProfile", e.target.checked)}
            >
              Add Profile
            </Checkbox>
            {methods.watch("hasProfile") && <PersonalInfo />}
            <Checkbox
              isChecked={methods.watch("hasAddress")}
              onChange={(e) => methods.setValue("hasAddress", e.target.checked)}
            >
              Add Address
            </Checkbox>
            {methods.watch("hasAddress") && <Address />}
            <Checkbox
              isChecked={methods.watch("hasAvatar")}
              onChange={(e) => methods.setValue("hasAvatar", e.target.checked)}
            >
              Add Avatar
            </Checkbox>
            {methods.watch("hasAvatar") && <Avatar />}
          </Stack>
          <Flex justify="flex-end" gap={4} mt={6}>
            <Button type="submit" isLoading={isCreating || isUpdating}>
              {mode === "edit" ? "Update User" : "Create User"}
            </Button>
          </Flex>
        </form>
      </Flex>
    </FormProvider>
  );
};

export default UserForm;
