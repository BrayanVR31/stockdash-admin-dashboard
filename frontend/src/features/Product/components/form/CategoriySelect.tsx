import {
  createListCollection,
  Portal,
  Select,
  Spinner,
  Field,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { ProductInputs } from "@/models/productSchema";
import { useCategories } from "@/hooks/useCategory";
import { useMemo } from "react";

const CategorySelect = () => {
  const { data, isPending } = useCategories();
  const collection = useMemo(() => {
    return createListCollection({
      items: data ?? [],
      itemToString: (category) => category.name,
      itemToValue: (category) => category._id,
    });
  }, [data]);
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductInputs>();
  return (
    <Field.Root required invalid={!!errors?.categories}>
      <Field.Label>
        Selecciona categorías <Field.RequiredIndicator />{" "}
      </Field.Label>
      <Controller
        control={control}
        name="categories"
        render={({ field }) => (
          <Select.Root
            multiple
            name={field.name}
            value={field.value as string[] | undefined}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            disabled={(data?.length || 0) <= 0}
            collection={collection}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Selecciona categorías" />
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
                  {collection.items.map((category) => (
                    <Select.Item item={category} key={category._id}>
                      {category.name}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
      <Field.ErrorText>{errors?.categories?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { CategorySelect };
