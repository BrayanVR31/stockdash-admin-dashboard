import { Field, Select } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { PurchaseInputs } from "@/models/purchaseSchema";

const PurchaseStatus = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PurchaseInputs>();

  return (
    <Field.Root required invalid={!!errors?.status}>
      <Field.Label>
        Estado de la compra
        <Field.RequiredIndicator />
      </Field.Label>
      <Select {...register("status", { required: "Este campo es requerido" })}>
        <option value="pending">Pendiente</option>
        <option value="completed">Completada</option>
        <option value="cancelled">Cancelada</option>
      </Select>
      <Field.ErrorText>{errors?.status?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export { PurchaseStatus };
