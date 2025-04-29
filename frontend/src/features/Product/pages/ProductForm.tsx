import { Card, Field, Input, InputGroup, Stack, Stat } from "@chakra-ui/react";
import { ProductStatus, SupplierSelect } from "../components/form";

const ProductForm = () => {
  return (
    <Card.Root mx="auto" maxW="5xl">
      <Card.Header>
        <Card.Title>Crear producto</Card.Title>
        <Card.Description>
          Agrega todos datos que sean requeridos para registrar un producto
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          <Field.Root required>
            <Field.Label>
              Nombre
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Escribe el nombre de producto" />
          </Field.Root>
          {/** Product price */}
          <Stack
            direction={{
              base: "column",
              md: "row",
            }}
            gap={6}
          >
            <Field.Root required>
              <Field.Label>
                Precio de venta
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startAddon="$" endAddon="MX">
                <Input placeholder="Escribe el precio de venta" />
              </InputGroup>
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Precio de compra
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startAddon="$" endAddon="MX">
                <Input placeholder="Escribe el precio de compra" />
              </InputGroup>
            </Field.Root>
          </Stack>
          <ProductStatus />
          <SupplierSelect />
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export { ProductForm };
