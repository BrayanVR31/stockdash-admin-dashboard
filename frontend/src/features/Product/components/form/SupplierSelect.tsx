import {
  createListCollection,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useSuppliers } from "@/hooks/useSupplier";
import { useMemo } from "react";

const SupplierSelect = () => {
  const { data, isPending } = useSuppliers();
  const collection = useMemo(() => {
    return createListCollection({
      items: data?.results ?? [],
      itemToString: (supplier) => supplier.name,
      itemToValue: (supplier) => supplier._id,
    });
  }, [data]);
  return (
    <Select.Root collection={collection}>
      <Select.HiddenSelect />
      <Select.Label>Selecciona proveedores</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Selecciona proveedores" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator>
            {isPending && (
              <Spinner size="xs" borderWidth="1.5px" color="fg.info" />
            )}
          </Select.Indicator>
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((supplier) => (
              <Select.Item item={supplier} key={supplier._id}>
                {supplier.name}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export { SupplierSelect };
