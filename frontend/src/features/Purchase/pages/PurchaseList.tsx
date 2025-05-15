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
import { HeadingList } from "../components/list";

const PurchaseTable = lazy(() =>
  import("../components/table").then((mod) => ({
    default: mod.PurchaseTable,
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
        Gestión de compras
      </Text>
    </>
  );
};

const PurchaseList = () => {
  return (
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
              <HeadingList />
            </Stack>
            <Stack>
              <Stack direction="row">
                <InputGroup flex="1" startElement={<GoSearch />}>
                  <Input placeholder="Busca compras" />
                </InputGroup>
                <Button colorPalette="blue" asChild>
                  <NavLink to="./create">
                    <GoPlus />
                    Agregar
                  </NavLink>
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Suspense fallback={<TableSkeletonLoader />}>
            <PurchaseTable />
          </Suspense>
        </CardLayout>
      </TableProvider>
    </Container>
  );
};

export { PurchaseList };
