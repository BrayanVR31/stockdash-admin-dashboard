import { Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { PurchaseInputs } from "@/models/purchaseSchema";

const TicketImage = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PurchaseInputs>();

  return (
    <Field.Root required invalid={!!errors?.hasTicketImage}>
      <Field.Label>
        Imagen del ticket
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        type="file"
        accept="image/*"
        multiple
        {...register("hasTicketImage")}
      />
      <Field.ErrorText>{errors?.hasTicketImage?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { TicketImage };
