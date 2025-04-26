import { Box, Flex } from "@chakra-ui/react";
import { Navigate } from "react-router";
import { useAuthenticationStore } from "@/store/authenticationStore";
import Auth from "./Auth";

export default function AuthLayout() {
  const isLogged = useAuthenticationStore((state) => state.isLogged);
  return isLogged ? (
    <Navigate to="dashboard" />
  ) : (
    <Flex
      minH="100vh"
      bg={{
        _dark: "gray.900",
        _light: "gray.50",
      }}
      align="center"
      justify="center"
      p={4}
    >
      <Box w="full" maxW="lg">
        <Auth />
      </Box>
    </Flex>
  );
}
