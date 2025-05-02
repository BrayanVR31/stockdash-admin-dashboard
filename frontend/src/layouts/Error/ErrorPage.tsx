import { VStack, Image, Text, Button } from "@chakra-ui/react";
import { useSystemError } from "@/store/systemErrorStore";
import { NavLink } from "react-router";

const ErrorPage = () => {
  const error = useSystemError((state) => state.error);
  if (!error) return null;
  return (
    <VStack justifyContent="center" h="full">
      <Image maxW="xl" src={error.image} alt={error.title} />
      <Text
        fontSize="6xl"
        fontWeight="bolder"
        color={{
          base: "pink.600",
          _dark: "pink.500",
        }}
      >
        {error.statusCode}
      </Text>
      <Text
        color={{
          base: "gray.800",
          _dark: "gray.200",
        }}
        fontWeight="bold"
        fontSize="3xl"
      >
        {error.title}
      </Text>
      <Text color={{ base: "gray.700", _dark: "gray.400" }} fontSize="md">
        {error.description}
      </Text>
      <Button colorPalette="purple" asChild>
        <NavLink to="/dashboard">Regresar al inicio</NavLink>
      </Button>
    </VStack>
  );
};

export default ErrorPage;
