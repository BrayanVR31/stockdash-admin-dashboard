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
import { useTable } from "@/components/table";

const HeaderList = () => {
  const { totalItems } = useTable();
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
          Todos los ventas
          <Badge ml="1" variant="surface" colorPalette="purple">
            {totalItems}
          </Badge>
        </Text>
      </Stack>
      <Stack>
        <Stack direction="row">
          <InputGroup flex="1" startElement={<GoSearch />}>
            <Input placeholder="Busca productos" />
          </InputGroup>
          <Button asChild>
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
