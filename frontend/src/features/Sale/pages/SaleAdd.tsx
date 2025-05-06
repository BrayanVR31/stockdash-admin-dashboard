import { Card, Stack, Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import { format } from "date-fns";
import { defaultSale, saleSchema, SaleInputs } from "@/models/saleSchema";
import LoadingOverlaySpinner from "@/components/ui/loading-overlay-spinner";
import {
  ProductSelect,
  UserSelect,
  TotalAmount,
  SaleTime,
  Status,
} from "../components/form";
import { useCreateSale } from "@/hooks/useSale";

const SaleAdd = () => {
  const methods = useForm<SaleInputs>({
    defaultValues: defaultSale,
    resolver: zodResolver(saleSchema),
    mode: "all",
  });
  const { mutate, isPending } = useCreateSale();
  const onSubmit: SubmitHandler<SaleInputs> = (data) => {
    console.log(data);
    const addedSale = produce(data, (draft) => {
      if (draft.hasSaleDate) {
        console.log(format(draft.saleDate, "yyyy-MM-dd"));
        draft.saleDate = format(
          draft.saleDate,
          "yyyy-MM-dd",
        ) as unknown as Date;
      }
      draft.user = data.user.find((x) => x) as unknown as string[];
    });

    mutate(addedSale);
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
          <Stack gap="8" w="full">
            {/** Form input fields here */}
            <Stack
              direction={{
                base: "column",
                md: "row",
              }}
              gap="6"
            >
              <ProductSelect />
              <UserSelect />
            </Stack>
            <TotalAmount />
            <SaleTime />
            <Status />
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

export { SaleAdd };
