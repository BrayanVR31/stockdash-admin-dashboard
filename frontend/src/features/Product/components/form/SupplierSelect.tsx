import {
  createListCollection,
  Field,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { ProductInputs } from "@/models/productSchema";
import { useSuppliers } from "@/hooks/useSupplier";
import { useMemo } from "react";

const SupplierSelect = () => {
  const { data, isPending, isError } = useSuppliers();
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductInputs>();
  const collection = useMemo(() => {
    return createListCollection({
      items: data?.results ?? [],
      itemToString: (supplier) => supplier.name,
      itemToValue: (supplier) => supplier._id,
    });
  }, [data]);
  return (
    <Field.Root
      position="relative"
      required
      invalid={isError || !!errors?.suppliers}
    >
      <Field.Label>
        Selecciona proveedores
        <Field.RequiredIndicator />{" "}
      </Field.Label>
      <Controller
        control={control}
        name="suppliers"
        render={({ field }) => (
          <Select.Root
            multiple
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            disabled={(data?.total || 0) <= 0}
            collection={collection}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Selecciona proveedores" />
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
        )}
      />
      <Field.ErrorText bottom="-5" position="absolute">
        {isError ? "Error al cargar los datos." : errors?.suppliers?.message}
      </Field.ErrorText>
    </Field.Root>
  );
};

export { SupplierSelect };
