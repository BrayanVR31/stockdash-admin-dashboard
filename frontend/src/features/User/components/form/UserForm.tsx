import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Stack,
  StackSeparator,
  Checkbox,
  Text,
  Card,
} from "@chakra-ui/react";
import { userSchema, UserInputs, defaultUser } from "@/models/userSchema";
import { useCreateUser, useUpdateUser, useGetUser } from "@/hooks/useUser";
import PersonalInfo from "./PersonalInfo";
import Address from "./Address";
import Avatar from "./Avatar";
import { useParams, NavLink } from "react-router";
import LoadingOverlaySpinner from "@/components/ui/loading-overlay-spinner";
import CreatingFields from "./CreatingFields";
import EditingFields from "./EditingFields";

interface UserFormProps {
  mode: "create" | "edit";
  user: UserInputs;
}

const EditFields = () => {
  const params = useParams();
  const { data } = useGetUser(params);
  return <></>;
};

const UserForm = ({ mode, user }: UserFormProps) => {
  const params = useParams();
  const methods = useForm<UserInputs>({
    resolver: zodResolver(userSchema),
    mode: "all",
    defaultValues: mode === "edit" ? user : defaultUser,
  });

  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isEditing } = useUpdateUser();

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    if (mode === "edit") {
      updateUser({
        id: params?.id || "",
        user: data,
      });
    } else {
      createUser(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <Card.Root
        onSubmit={methods.handleSubmit(onSubmit)}
        as="form"
        mx="auto"
        maxW="5xl"
      >
        <Card.Header
          mx="auto"
          w={{
            base: "full",
            md: "80%",
          }}
        >
          <Card.Title>{`${mode === "edit" ? "Editar" : "Crear"} usuario`}</Card.Title>
          <Card.Description>
            Agrega todos datos que sean requeridos para registrar un usuario
          </Card.Description>
        </Card.Header>
        <Card.Body
          mx="auto"
          w={{
            base: "full",
            md: "80%",
          }}
        >
          <Stack gap="8" w="full">
            {/** Form input fields here */}
            {mode === "edit" ? <EditingFields /> : <CreatingFields />}
          </Stack>
        </Card.Body>
        <Card.Footer
          mt="6"
          mx="auto"
          w={{
            base: "full",
            md: "80%",
          }}
          justifyContent="end"
        >
          <ButtonGroup>
            <Button asChild>
              <NavLink to="..">Cancelar</NavLink>
            </Button>
            <Button colorPalette="purple" type="submit">
              Guardar
            </Button>
          </ButtonGroup>
        </Card.Footer>
        {(isCreating || isEditing) && <LoadingOverlaySpinner />}
      </Card.Root>
    </FormProvider>
  );
};

export default UserForm;
