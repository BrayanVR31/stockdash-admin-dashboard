import { Checkbox, VStack } from "@chakra-ui/react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { ReactNode } from "react";
import { UserInputs } from "@/models/userSchema";

interface Props {
  field: ReactNode;
}

const HasUserName = ({ field }: Props) => {
  const { control } = useFormContext<UserInputs>();
  const hasUsername = useWatch({
    control,
    name: "hasUsername",
  });
  return (
    <VStack align="start" gap="4">
      <Controller
        control={control}
        name="hasUsername"
        render={({ field }) => (
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={(e) => field.onChange(!!e.checked)}
            variant="solid"
            colorPalette="blue"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              ¿Desea agregar el nombre de usuario?
            </Checkbox.Label>
          </Checkbox.Root>
        )}
      />
      {hasUsername && field}
    </VStack>
  );
};

export default HasUserName;
