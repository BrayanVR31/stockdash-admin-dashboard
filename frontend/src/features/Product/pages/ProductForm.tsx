import { Card, Stack, Button, ButtonGroup } from "@chakra-ui/react";
import {
  ProductStatus,
  SupplierSelect,
  ProductPrice,
  CategorySelect,
  ProductName,
  ProductDescription,
} from "../components/form";
import { CategoryMenu } from "@/components/menu-form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  defaultProduct,
  ProductInputs,
} from "@/models/productSchema";
import { useCreateProduct } from "@/hooks/useProduct";
import LoadingOverlaySpinner from "@/components/ui/loading-overlay-spinner";
import { NavLink } from "react-router";

const ProductForm = () => {
  const methods = useForm<ProductInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultProduct,
    mode: "all",
  });
  const { mutate, isPending } = useCreateProduct();
  const onSubmit: SubmitHandler<ProductInputs> = (data) => {
    console.log(data);
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
          <Card.Title>Crear producto</Card.Title>
          <Card.Description>
            Agrega todos datos que sean requeridos para registrar un producto
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
            <ProductName />
            {/** Product price */}
            <ProductPrice />
            <ProductStatus />
            <Stack
              gap="6"
              direction={{
                base: "column",
                md: "row",
              }}
            >
              <SupplierSelect />
              <Stack w="full" direction="row" alignItems="center">
                <CategorySelect />
                <CategoryMenu />
              </Stack>
            </Stack>
            <ProductDescription />
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

export { ProductForm };
