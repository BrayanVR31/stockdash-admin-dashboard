import { useState, useMemo, memo } from "react";
import { Controller, Control } from "react-hook-form";
import {
  Select,
  createListCollection,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { SaleInputs } from "@/models/saleSchema";
import { useProducts } from "@/hooks/useProduct";
import { VirtualizedSelectItem } from "@/components/virtualized-list";

type Props = {
  control: Control<SaleInputs>;
};

const LoadedContent = memo(({ control }: Props) => {
  const { data, isSuccess, isPending } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const collection = useMemo(() => {
    return createListCollection({
      items: isSuccess ? data : [],
      itemToString: (product) => product.name,
      itemToValue: (product) => product._id,
    });
  }, [data, isSuccess]);
  return (
    <Controller
      control={control}
      name="products"
      render={({ field }) => (
        <Select.Root
          open={isOpen}
          onOpenChange={() => setIsOpen(!isOpen)}
          multiple
          name={field.name}
          value={field.value}
          onValueChange={({ value }) => {
            field.onChange(value);
          }}
          onInteractOutside={() => field.onBlur()}
          disabled={(data?.length || 0) <= 0}
          collection={collection}
          positioning={{ flip: false }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Selecciona productos" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              {isPending && (
                <Spinner size="xs" borderWidth="1.5px" color="fg.info" />
              )}
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content overflow="hidden" minW="xs" h="3xs">
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      height={height}
                      width={width}
                      itemCount={collection.items.length}
                      itemSize={45}
                    >
                      {VirtualizedSelectItem(data, "name")}
                    </List>
                  )}
                </AutoSizer>
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      )}
    />
  );
});

export default LoadedContent;
