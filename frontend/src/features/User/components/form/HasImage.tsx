import { Checkbox } from "@chakra-ui/react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { ReactNode } from "react";
import { UserInputs } from "@/models/userSchema";

interface Props {
  field: ReactNode;
}

const HasImage = ({ field }: Props) => {
  const { control } = useFormContext<UserInputs>();
  const hasAvatar = useWatch({
    control,
    name: "profile.hasAvatar",
  });
  return (
    <>
      <Controller
        control={control}
        name="profile.hasAvatar"
        render={({ field }) => (
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={(e) => field.onChange(!!e.checked)}
            variant="solid"
            colorPalette="blue"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>¿Desea agregar una foto de perfil?</Checkbox.Label>
          </Checkbox.Root>
        )}
      />
      {hasAvatar && field}
    </>
  );
};

export default HasImage;
