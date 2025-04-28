import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Stack, StackSeparator } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { accountSchema, AccountInputs } from "../../models/accountSchema";
import PersonalInfo from "./PersonalInfo";
import Contact from "./Contact";
import Address from "./Address";
import { useProfileSession, useUpdateAccount } from "@/hooks/useProfile";
import UploadAvatar from "./UploadAvatar";

const Form = () => {
  const { data } = useProfileSession();
  const methods = useForm({
    resolver: zodResolver(accountSchema),
    mode: "all",
    defaultValues: {
      profile: {
        name: data.profile.name,
        lastName: data.profile.lastName,
        hasAddress: !!data.profile.address,
        address: {
          state: data?.profile?.address?.state || "",
          city: data?.profile?.address?.city || "",
          street: data?.profile?.address?.street || "",
          country: data?.profile?.address?.country || "",
          zipCode: `${data?.profile?.address?.zipCode || ""}`,
        },
        hasContact: !!data.profile?.phoneNumber,
        phoneNumber: data.profile?.phoneNumber || null,
        avatar: data?.profile?.avatar?._id || null,
        username: data?.username || null,
      },
    },
  });
  const { mutate } = useUpdateAccount();

  const onSubmit: SubmitHandler<AccountInputs> = (account) => {
    console.log(data);
    mutate({
      profile: {
        name: account.profile.name,
        lastName: account.profile.lastName,
        avatar: account.profile?.avatar,
        address: account.profile?.hasAddress
          ? {
              city: account.profile?.address?.city,
              state: account.profile?.address?.state,
              street: account.profile?.address?.street,
              zipCode: account.profile?.address?.zipCode,
              country: account.profile?.address?.country,
            }
          : data.profile?.address,
        phoneNumber: account.profile?.hasContact
          ? account.profile?.phoneNumber
          : null,
      },
      username: account?.profile?.username,
    });
  };
  console.log("react query[account]: ", data.profile?.avatar?.path);
  return (
    <FormProvider {...methods}>
      <Flex direction="column" gap={6} asChild>
        <form
          onSubmit={methods.handleSubmit(onSubmit, (e) => console.log(e))}
          autoComplete="off"
        >
          <UploadAvatar defaultPath={data.profile?.avatar?.path} />
          <Stack gapY="5" separator={<StackSeparator />}>
            {/*** Personal info */}
            <PersonalInfo />
            {/** Contact */}
            <Contact />
            {/** Street */}
            <Address />
          </Stack>
          <Flex
            justify={{
              base: "space-between",
              md: "flex-end",
            }}
            gap={4}
            mt={6}
          >
            <Button variant="solid" asChild>
              <NavLink to="/dashboard">Cancelar</NavLink>
            </Button>
            <Button type="submit" colorPalette="purple">
              Guardar
            </Button>
          </Flex>
        </form>
      </Flex>
    </FormProvider>
  );
};

export { Form };
