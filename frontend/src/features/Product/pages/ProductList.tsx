import {
  Badge,
  Button,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { GoPlus, GoSearch } from "react-icons/go";
import { CardLayout } from "@/layouts/System";
import { PerPage, PagingTable, TableProvider } from "@/components/table";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TableSkeletonLoader from "@/components/ui/table-skeleton-loader";
import Container from "@/layouts/Dashboard/Container";
import { NavLink } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/layouts/Error/ErrorPage";

const ProductTable = lazy(() =>
  import("../components/table").then((mod) => ({
    default: mod.ProductTable,
  }))
);

const Footer = () => {
  return (
    <Stack
      direction={{
        base: "column",
        md: "row",
      }}
      w="full"
      justify="space-between"
    >
      <PerPage />
      <PagingTable />
    </Stack>
  );
};

const Header = () => {
  return (
    <>
      <Breadcrumbs />
      <Text mt="2" fontSize="lg" fontWeight="semibold">
        Gestión de productos
      </Text>
    </>
  );
};

const ProductList = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Container>
        <TableProvider pathKey="_id">
          <CardLayout footer={<Footer />} header={<Header />}>
            <Stack
              align="center"
              justify="space-between"
              direction={{
                base: "column",
                md: "row",
              }}
            >
              <Stack>
                <Text
                  color={{
                    base: "gray.700",
                    _dark: "gray.200",
                  }}
                  fontWeight="semibold"
                  fontSize="md"
                >
                  Todos los productos
                  <Badge ml="1" variant="surface" colorPalette="purple">
                    100
                  </Badge>
                </Text>
              </Stack>
              <Stack>
                <Stack direction="row">
                  <InputGroup flex="1" startElement={<GoSearch />}>
                    <Input placeholder="Busca productos" />
                  </InputGroup>
                  <Button asChild>
                    <NavLink to="./create">
                      <GoPlus />
                      Agregar
                    </NavLink>
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Suspense fallback={<TableSkeletonLoader />}>
              <ProductTable />
            </Suspense>
          </CardLayout>
        </TableProvider>
      </Container>
    </ErrorBoundary>
  );
};

export { ProductList };
