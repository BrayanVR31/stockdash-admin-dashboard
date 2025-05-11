import { FallbackProps } from "react-error-boundary";
import { NavLink } from "react-router";
import { Text, VStack, Button, defineStyle, Image } from "@chakra-ui/react";
import internalError from "@/assets/error/serverError.svg";

const statusHeading = defineStyle({
  colorPalette: "blue",
  fontWeight: "bold",
  fontSize: "6xl",
  color: "colorPalette.fg",
});

const title = defineStyle({
  fontWeight: "bold",
  fontSize: "3xl",
});

const description = defineStyle({
  colorPalette: "gray",
  fontSize: "md",
  color: "colorPalette.fg",
});

const errorApp = (props: FallbackProps) => {
  return (
    <VStack>
      <VStack>
        <Text as="h4" {...statusHeading}>
          500
        </Text>
        <Text as="h5" {...title}>
          Ocurrió un error en la aplicación
        </Text>
        <Text as="p" {...description}>
          Hubo un problema interno al procesar la página. Por favor, intenta
          recargar.
        </Text>
        <Button mt="4" colorPalette="blue">
          <NavLink to="/dashboard">Ir al dashboard</NavLink>
        </Button>
      </VStack>
      <Image mt="8" height="200px" src={internalError} />
    </VStack>
  );
};

export default errorApp;
