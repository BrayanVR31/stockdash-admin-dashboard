import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { BsPlus } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateCategory } from "@/hooks/useCategory";
import LoadingOverlaySpinner from "@/components/ui/loading-overlay-spinner";

type CategoryInputs = { name: string };

const CategoryMenu = () => {
  const { mutate, isPending, isSuccess } = useCreateCategory();
  const ref = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CategoryInputs>({
    mode: "all",
  });
  const onSubmit: SubmitHandler<CategoryInputs> = (data) => {
    console.log(data);
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess)
      reset({
        name: "",
      });
  }, [isSuccess, reset]);
  return (
    <Dialog.Root initialFocusEl={() => ref.current}>
      <Dialog.Trigger asChild>
        <Button
          alignSelf="end"
          size="md"
          variant="surface"
          colorPalette="green"
        >
          <BsPlus />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Crear categoría</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack
                onSubmit={handleSubmit(onSubmit)}
                id="category-form"
                as="form"
                gap="4"
              >
                <Field.Root required invalid={!!errors?.name}>
                  <Field.Label>
                    Nombre
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    required
                    {...register("name", {
                      minLength: {
                        value: 1,
                        message: "El campo categoría es un campo requerido.",
                      },
                    })}
                    placeholder="Escribe una nueva categoría"
                  />
                  <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button colorPalette="red" variant="outline">
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                form="category-form"
                type="submit"
                variant="outline"
                colorPalette="purple"
              >
                Guardar
              </Button>
            </Dialog.Footer>
            {isPending && <LoadingOverlaySpinner />}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export { CategoryMenu };
