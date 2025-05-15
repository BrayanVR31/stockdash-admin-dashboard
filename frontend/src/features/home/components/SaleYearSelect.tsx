import {
  createListCollection,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useSaleYears } from "@/hooks/useAnalytic";
import useSaleAnalyticStore from "@/store/saleAnalyticStore";
import { useMemo } from "react";

const SaleYearSelect = () => {
  const { data, isPending } = useSaleYears();
  const setSaleYear = useSaleAnalyticStore((state) => state.setSaleYear);
  const collection = useMemo(() => {
    return createListCollection({
      items: data ?? [],
      itemToString: (sale) => `${sale.year}`,
      itemToValue: (sale) => sale.year.toString(),
    });
  }, [data]);
  return (
    <Select.Root
      onValueChange={({ value }) => {
        const [year] = value;
        setSaleYear(+year);
      }}
      collection={collection}
      size="sm"
      defaultValue={["2025"]}
    >
      <Select.HiddenSelect />
      <Select.Label>Selecciona el año</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Selecciona el año" />
          <Select.IndicatorGroup>
            {isPending && (
              <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
            )}
          </Select.IndicatorGroup>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((sale) => (
              <Select.Item item={sale} key={sale.year}>
                {sale.year}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SaleYearSelect;
