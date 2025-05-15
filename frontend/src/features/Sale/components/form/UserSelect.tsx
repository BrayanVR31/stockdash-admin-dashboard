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
import { useUsers } from "@/hooks/useUser";
import { useMemo } from "react";

const VirualizedItem =
  <T extends unknown[]>(data: T) =>
  ({ index, style }: ListChildComponentProps) => {
    const email = _.get(data[index], "email", "");
    return (
      <Select.Item truncate style={style} item={data[index]}>
        {email}
        <Select.ItemIndicator />
      </Select.Item>
    );
  };

const UserSelect = () => {
  const { data, isPending, isSuccess, isError } = useUsers();
  const {
    control,
    formState: { errors },
  } = useFormContext<SaleInputs>();
  const collection = useMemo(() => {
    return createListCollection({
      items: isSuccess ? data : [],
      itemToString: (user) => user?.email,
      itemToValue: (user) => user._id,
    });
  }, [data, isSuccess]);
  return (
    <Field.Root required invalid={isError || !!errors?.user}>
      <Field.Label>
        Selecciona usuario
        <Field.RequiredIndicator />
      </Field.Label>
      <Controller
        control={control}
        name="user"
        render={({ field }) => (
          <Select.Root
            name={field.name}
            value={field.value as unknown as string[]}
            onValueChange={({ value }) => {
              console.log(value);
              field.onChange(value);
            }}
            positioning={{ flip: false }}
            onInteractOutside={() => field.onBlur()}
            disabled={isError || (data?.length || 0) <= 0}
            collection={collection}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Selecciona usuario" />
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
                {!isError && (
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
                )}
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
      <Field.ErrorText>
        {isError ? "Error al cargar los datos." : errors?.user?.message}
      </Field.ErrorText>
    </Field.Root>
  );
};

export { UserSelect };
