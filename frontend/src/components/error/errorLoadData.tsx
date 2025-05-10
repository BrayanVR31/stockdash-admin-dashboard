import { Alert, AlertIndicator, Link } from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";
import { RxUpdate } from "react-icons/rx";
import { getQueryClient } from "@/QueryClient";

const errorLoadData = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Alert.Root mt="6" status="error" variant="surface">
      <AlertIndicator />
      <Alert.Content>
        <Alert.Title>Error al cargar los datos</Alert.Title>
        <Alert.Description>
          Ocurrió un problema al cargar los datos. Intente recargar la página o
          verifique su conexión.
        </Alert.Description>
      </Alert.Content>
      <Link onClick={() => resetErrorBoundary()} as="button">
        <RxUpdate />
        Recargar
      </Link>
    </Alert.Root>
  );
};

export const resetQuery = (key: string) => () => {
  const queryClient = getQueryClient();
  queryClient.resetQueries({
    queryKey: [key, { currentPage: 1, perPage: 10 }],
  });
};

export default errorLoadData;
