import {
  createListCollection,
  Portal,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTable } from "./useTable";

const itemsPerPage = createListCollection({
  items: [
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "25", value: "25" },
    { label: "50", value: "50" },
    { label: "100", value: "100" },
  ],
});

const PerPage = () => {
  const { setPerPage, perPage } = useTable();
  return (
    <Stack direction="row" align="center">
      <Text fontSize="sm">Filas por página</Text>
      <Select.Root
        onValueChange={({ value }) => setPerPage(+[...value].pop()!)}
        collection={itemsPerPage}
        defaultValue={[`${perPage}`]}
        size="sm"
        w="70px"
      >
        <Select.HiddenSelect />

        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Página" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {itemsPerPage.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Stack>
  );
};

export default PerPage;
