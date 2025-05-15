import { Card, Stack, Button, ButtonGroup } from "@chakra-ui/react";
import {
  PurchaseName,
  PurchasePrice,
  PurchaseQuantity,
  SupplierSelect,
  ProductSelect,
  PurchaseDate,
  TicketImage,
} from "../components/form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  purchaseSchema,
  defaultPurchase,
  PurchaseInputs,
} from "@/models/purchaseSchema";
import { useCreatePurchase } from "@/hooks/usePurchase";
import LoadingOverlaySpinner from "@/components/ui/loading-overlay-spinner";
import { NavLink } from "react-router";

const PurchaseForm = () => {
  const methods = useForm<PurchaseInputs>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: defaultPurchase,
    mode: "onSubmit",
    shouldUnregister: false,
  });
  const { mutate, isPending } = useCreatePurchase();
  const onSubmit: SubmitHandler<PurchaseInputs> = (data) => {
    mutate(data);
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
          <Card.Title>Crear compra</Card.Title>
          <Card.Description>
            Agrega todos los datos requeridos para registrar una compra
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
            <PurchaseName />
            <Stack
              gap="6"
              direction={{
                base: "column",
                md: "row",
              }}
            >
              <PurchasePrice />
              <PurchaseQuantity />
            </Stack>
            <Stack
              gap="6"
              direction={{
                base: "column",
                md: "row",
              }}
            >
              <SupplierSelect />
              <ProductSelect />
            </Stack>
            <PurchaseDate />
            <TicketImage />
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
        {isPending && <LoadingOverlaySpinner />}
      </Card.Root>
    </FormProvider>
  );
};

export { PurchaseForm };
