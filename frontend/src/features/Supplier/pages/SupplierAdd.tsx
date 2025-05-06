import { Card, Stack, Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import {
  defaultSupplier,
  supplierSchema,
  SupplierInputs,
} from "@/models/supplierSchema";
import LoadingOverlaySpinner from "@/components/ui/loading-overlay-spinner";
import { Name, SocialMedia, Address, Image, Contact } from "../components/form";
import { useCreateSupplier } from "@/hooks/useSupplier";

const SupplierAdd = () => {
  const methods = useForm<SupplierInputs>({
    defaultValues: defaultSupplier,
    resolver: zodResolver(supplierSchema),
    mode: "all",
  });
  const { mutate, isPending } = useCreateSupplier();
  const onSubmit: SubmitHandler<SupplierInputs> = (data) => {
    console.log("submitting: ", data);
    mutate(data);
  };
  return (
    <FormProvider {...methods}>
      <Card.Root
        onSubmit={methods.handleSubmit(onSubmit, (e) => console.log(e))}
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
          <Card.Title>Crear venta</Card.Title>
          <Card.Description>
            Agrega todos datos que sean requeridos para registrar una venta
          </Card.Description>
        </Card.Header>
        <Card.Body
          mx="auto"
          w={{
            base: "full",
            md: "80%",
          }}
        >
          <Stack gap="14" w="full">
            {/** Form input fields here */}
            <Stack
              direction={{
                base: "column",
                md: "row",
              }}
            >
              <Name />
            </Stack>
            <Image />
            <Address />
            <Contact />
            <SocialMedia />
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
        {isPending && <LoadingOverlaySpinner message="Guardando información" />}
      </Card.Root>
    </FormProvider>
  );
};

export { SupplierAdd };
