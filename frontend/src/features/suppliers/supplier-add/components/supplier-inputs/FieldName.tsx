import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label, Error } from "@/components/ui/custom-form";
import { SupplierCreate } from "@/features/suppliers/supplier-add/supplierSchema";

const FieldName = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SupplierCreate>();
  return (
    <>
      <Label htmlFor="name" isRequired>
        Nombre
      </Label>
      <Input
        id="name"
        placeholder="Escribe el nombre del proveedor"
        {...register("name")}
      />
      <Error message={errors?.name?.message} />
    </>
  );
};

export { FieldName };
