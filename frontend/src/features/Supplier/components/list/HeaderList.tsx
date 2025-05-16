import {
  Stack,
  Text,
  Badge,
  InputGroup,
  Input,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import { GoPlus, GoSearch } from "react-icons/go";

const HeaderList = () => {
  return (
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
          Todos los proveedores
          <Badge ml="1" variant="surface" colorPalette="blue">
            100
          </Badge>
        </Text>
      </Stack>
      <Stack>
        <Stack direction="row">
          <InputGroup flex="1" startElement={<GoSearch />}>
            <Input placeholder="Busca productos" />
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
  );
};

export { HeaderList };
