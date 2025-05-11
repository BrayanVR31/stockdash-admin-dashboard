import { Checkbox } from "@chakra-ui/react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { ReactNode } from "react";
import { UserInputs } from "@/models/userSchema";

interface Props {
  field: ReactNode;
}

const HasProfile = ({ field }: Props) => {
  const { control } = useFormContext<UserInputs>();
  const hasProfile = useWatch({
    control,
    name: "hasProfile",
  });
  return (
    <>
      <Controller
        control={control}
        name="hasProfile"
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
              ¿Desea agregar el perfil de usuario?
            </Checkbox.Label>
          </Checkbox.Root>
        )}
      />
      {hasProfile && field}
    </>
  );
};

export default HasProfile;
