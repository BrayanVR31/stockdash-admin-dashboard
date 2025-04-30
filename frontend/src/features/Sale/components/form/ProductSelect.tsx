import {
  createListCollection,
  Field,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { SaleInputs } from "@/models/saleSchema";
import { useProducts } from "@/hooks/useProduct";
import { useMemo } from "react";

const ProductSelect = () => {
  const { data, isPending, isSuccess } = useProducts();
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
    <Field.Root required invalid={!!errors?.products}>
      <Field.Label>
        Selecciona productos
        <Field.RequiredIndicator />
      </Field.Label>
      <Controller
        control={control}
        name="products"
        render={({ field }) => (
          <Select.Root
            multiple
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            disabled={(data?.length || 0) <= 0}
            collection={collection}
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
                <Select.Content>
                  {collection.items.map((product) => (
                    <Select.Item item={product} key={product._id}>
                      {product.name}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
      <Field.ErrorText>{errors?.products?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { ProductSelect };
