import { Text, VStack, defineStyle, Button, Image } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { ResourceError } from "@/store/systemErrorStore";

const statusHeading = defineStyle({
  colorPalette: "blue",
  fontWeight: "bold",
  fontSize: "6xl",
  color: "colorPalette.fg",
});

const heading = defineStyle({
  fontWeight: "bold",
  fontSize: "3xl",
});

const description = defineStyle({
  colorPalette: "gray",
  fontSize: "md",
  color: "colorPalette.fg",
});

type Props = ResourceError;

const NetworkError = ({ status, title, message, image }: Props) => {
  return (
    <VStack>
      <VStack>
        <Text as="h4" {...statusHeading}>
          {status}
        </Text>
        <Text as="h5" {...heading}>
          {title}
        </Text>
        <Text as="p" {...description}>
          {message}
        </Text>
        <Button mt="4" colorPalette="blue">
          <NavLink to="/dashboard">Ir al dashboard</NavLink>
        </Button>
      </VStack>
      <Image mt="8" height="200px" src={image} />
    </VStack>
  );
};

export default NetworkError;
