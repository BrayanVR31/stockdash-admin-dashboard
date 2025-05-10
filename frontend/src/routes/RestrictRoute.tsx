import { NavLink, Outlet, useLocation } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import {
  Button,
  ButtonGroup,
  defineStyle,
  Image,
  Stack,
} from "@chakra-ui/react";
import useSystemErrorStore from "@/store/systemErrorStore";
import { Text, VStack } from "@chakra-ui/react";

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

const RestrictRoute = () => {
  const errors = useSystemErrorStore((state) => state.errors);
  const location = useLocation();
  const paths = location.pathname.split("/").filter((p) => p);
  const error = errors.find((e) => paths.includes(e.resource));
  if (error)
    return (
      <VStack>
        <VStack>
          <Text as="h4" {...statusHeading}>
            {error.status}
          </Text>
          <Text as="h5" {...title}>
            {error.title}
          </Text>
          <Text as="p" {...description}>
            {error.message}
          </Text>
          <Button mt="4" colorPalette="blue">
            <NavLink to="/dashboard">Ir al dashboard</NavLink>
          </Button>
        </VStack>
        <Image mt="8" height="200px" src={error.image} />
      </VStack>
    );
  return (
    <ErrorBoundary fallback={<div>Error...</div>}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default RestrictRoute;
