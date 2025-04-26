import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Flex,
  Input,
  Text,
  Stack,
  StackSeparator,
  defineStyle,
  SkeletonCircle,
  useFileUploadContext,
  useFileUpload,
} from "@chakra-ui/react";
import { accountSchema, AccountInputs } from "../../models/accountSchema";
import PersonalInfo from "./PersonalInfo";
import Contact from "./Contact";
import Address from "./Address";
import { useProfileSession } from "@/hooks/useProfile";
import UploadAvatar from "./UploadAvatar";
import { useUploadFile, useAttachFile } from "@/hooks/useUpload";

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
        phoneNumber: data.profile?.phoneNumber,
        avatar: data?.profile?.avatar?._id || null,
        username: data?.profile?.username,
      },
    },
  });
  const onSubmit: SubmitHandler<AccountInputs> = (data) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <Flex direction="column" gap={6} asChild>
        <form
          onSubmit={methods.handleSubmit(onSubmit, (e) => console.log(e))}
          autoComplete="off"
        >
          <UploadAvatar />
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
            <Button variant="solid">Cancelar</Button>
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
