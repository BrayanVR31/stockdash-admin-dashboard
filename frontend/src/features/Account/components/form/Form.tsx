import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Stack, StackSeparator } from "@chakra-ui/react";
import { NavLink } from "react-router";
import {
  accountSchema,
  AccountInputs,
  defaultAccount,
} from "../../models/accountSchema";
import PersonalInfo from "./PersonalInfo";
import Contact from "./Contact";
import Address from "./Address";
import { useProfileSession, useUpdateAccount } from "@/hooks/useProfile";
import UploadAvatar from "./UploadAvatar";
import LoadingOverlaySpinner from "@/components/ui/loading-overlay-spinner";
import { produce } from "immer";

const Form = () => {
  const { data, isSuccess } = useProfileSession();
  const initialAccount = produce(defaultAccount, (draft) => {
    if (isSuccess) {
      draft.profile.name = data?.profile?.name;
      draft.profile.lastName = data?.profile?.lastName;
      draft.profile.avatar = data?.profile?.avatar?._id || null;
      draft.profile.hasAddress = data?.profile?.address !== null;
      if (draft.profile.hasAddress) {
        draft.profile.address.city = data?.profile?.address?.city || "";
        draft.profile.address.state = data?.profile?.address?.state || "";
        draft.profile.address.street = data?.profile?.address?.street || "";
        draft.profile.address.zipCode = data?.profile?.address?.zipCode || "";
        draft.profile.address.country = data?.profile?.address?.country || "";
      }
      draft.profile.hasContact = data?.profile?.phoneNumber !== null;
      if (draft.profile.hasContact) {
        draft.profile.phoneNumber = data?.profile?.phoneNumber || "";
      }
    }
    return defaultAccount;
  });
  const methods = useForm<AccountInputs>({
    resolver: zodResolver(accountSchema),
    mode: "all",
    defaultValues: initialAccount,
  });
  const { mutate, isPending } = useUpdateAccount();

  const onSubmit: SubmitHandler<AccountInputs> = (account) => {
    // console.log(data);
    /*
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
    */
    mutate(account);
    console.log("sending data: ", account);
  };
  return (
    <>
      <FormProvider {...methods}>
        <Flex direction="column" gap={6} asChild>
          <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            <UploadAvatar defaultPath={"anonymous"} />
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
      {isPending && <LoadingOverlaySpinner message="Enviando información" />}
    </>
  );
};

export { Form };
