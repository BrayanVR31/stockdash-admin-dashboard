import { Button, ButtonGroup, HStack, Stack, Text } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TableProvider } from "@/components/table";
import TableSkeletonLoader from "@/components/ui/table-skeleton-loader";
import ErrorPage from "@/layouts/Error/ErrorPage";

const SuspenseTable = lazy(() => import("./userTable"));

const UserList = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Stack mt={5} mx="auto" maxW="5xl">
        <HStack justify="space-between">
          <Text fontWeight="bolder" fontSize="3xl">
            Lista de usuarios
          </Text>
          <ButtonGroup
            size="sm"
            variant={{
              _dark: "outline",
              _light: "solid",
            }}
          >
            <Button colorPalette="purple">Agregar</Button>
            <Button colorPalette="gray">Regresar</Button>
          </ButtonGroup>
        </HStack>
        <Suspense fallback={<TableSkeletonLoader columns={6} />}>
          <TableProvider pathKey="_id">
            <SuspenseTable />
          </TableProvider>
        </Suspense>
      </Stack>
    </ErrorBoundary>
  );
};

export { UserList };
