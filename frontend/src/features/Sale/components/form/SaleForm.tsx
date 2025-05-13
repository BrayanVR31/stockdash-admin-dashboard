import { Card, Stack, Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink, useParams } from "react-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import { format } from "date-fns";
import { defaultSale, saleSchema, SaleInputs } from "@/models/saleSchema";
import LoadingOverlaySpinner from "@/components/ui/loading-overlay-spinner";
import { ProductSelect, UserSelect, TotalAmount, SaleTime, Status } from "./";
import { useCreateSale, useUpdateSale, useSaleItem } from "@/hooks/useSale";
import { useEffect } from "react";

interface SaleFormProps {
  mode: "create" | "edit";
}

const SaleForm = ({ mode }: SaleFormProps) => {
  const { id } = useParams();
  const { data: saleData } =
    mode === "edit" ? useSaleItem(id!) : { data: null };

  const methods = useForm<SaleInputs>({
    defaultValues:
      mode === "edit" && saleData
        ? {
            products: saleData.products,
            user: [saleData.user],
            status: saleData.status,
            totalAmount: saleData.totalAmount,
            hasSaleDate: !!saleData.saleDate,
            ...(saleData.saleDate && { saleDate: new Date(saleData.saleDate) }),
          }
        : defaultSale,
    resolver: zodResolver(saleSchema),
    mode: "all",
  });

  const createSale = useCreateSale();
  const updateSale = useUpdateSale();

  const onSubmit: SubmitHandler<SaleInputs> = (data) => {
    const processedData = produce(data, (draft) => {
      if (draft.hasSaleDate) {
        draft.saleDate = format(
          draft.saleDate,
          "yyyy-MM-dd"
        ) as unknown as Date;
      }
      draft.user = data.user.find((x) => x) as unknown as string[];
    });

    if (mode === "create") {
      createSale.mutate(processedData);
    } else {
      updateSale.mutate({ sale: processedData, id: id! });
    }
  };

  const isPending = createSale.isPending || updateSale.isPending;

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
          <Card.Title>
            {mode === "create" ? "Crear venta" : "Editar venta"}
          </Card.Title>
          <Card.Description>
            {mode === "create"
              ? "Agrega todos datos que sean requeridos para registrar una venta"
              : "Modifica los datos de la venta según sea necesario"}
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
              {mode === "create" ? "Guardar" : "Actualizar"}
            </Button>
          </ButtonGroup>
        </Card.Footer>
        {isPending && <LoadingOverlaySpinner />}
      </Card.Root>
    </FormProvider>
  );
};

export { SaleForm };
