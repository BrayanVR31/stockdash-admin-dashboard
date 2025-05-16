import {
  createListCollection,
  Field,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import _ from "lodash";
import { SaleInputs } from "@/models/saleSchema";
import { useProducts } from "@/hooks/useProduct";
import { useMemo, useState } from "react";

const VirualizedItem =
  <T extends unknown[]>(data: T) =>
  ({ index, style }: ListChildComponentProps) => {
    const name = _.get(data[index], "name", "");
    return (
      <Select.Item truncate style={style} item={data[index]}>
        {name}
        <Select.ItemIndicator />
      </Select.Item>
    );
  };

const ProductSelect = () => {
  const { data, isPending, isSuccess, isError } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext<SaleInputs>();
  const collection = useMemo(() => {
    return createListCollection({
      items: isSuccess ? data : [],
      itemToString: (product) => product.name,
      itemToValue: (product) => product._id,
    });
  }, [data, isSuccess]);
  return (
    <Field.Root
      position="relative"
      invalid={isError || !!errors?.products}
      required
    >
      <Field.Label>
        Selecciona productos
        <Field.RequiredIndicator />
      </Field.Label>
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
                        {VirualizedItem(data ?? [])}
                      </List>
                    )}
                  </AutoSizer>
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
      <Field.ErrorText>
        {errors?.products && errors?.products?.message}
      </Field.ErrorText>
    </Field.Root>
  );
};

export { ProductSelect };
