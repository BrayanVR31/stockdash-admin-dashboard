import { lazy, Suspense } from "react";
import { Box, Text } from "@chakra-ui/react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import delay from "@/utils/delay";
import { SkeletonAccountForm } from "../components/skeleton";

const Form = lazy(() =>
  delay(
    import("../components/form").then((module) => ({
      default: module.Form,
    })),
    1_20,
  ),
);

const AccountSettings = () => {
  useDocumentTitle("ajustes de cuenta");
  return (
    <Box p={8} minH="100vh">
      <Box
        bg={{
          _light: "white",
        }}
        rounded="2xl"
        maxW="4xl"
        mx="auto"
        p={10}
        boxShadow="xl"
      >
        <Text
          textAlign={{
            base: "center",
            md: "start",
          }}
          fontSize="2xl"
          fontWeight="bold"
        >
          Cuenta de usuario
        </Text>
        <Text
          color={{
            _light: "gray.800",
            _dark: "gray.200",
          }}
          pb={4}
          mb={6}
          borderBottom="sm"
          borderColor={{
            _light: "gray.300",
            _dark: "gray.600",
          }}
          textAlign={{
            base: "center",
            md: "start",
          }}
        >
          Actualiza los datos de cuenta de usuario
        </Text>
        <Suspense fallback={<SkeletonAccountForm />}>
          <Form />
        </Suspense>
      </Box>
    </Box>
  );
};

export { AccountSettings };
