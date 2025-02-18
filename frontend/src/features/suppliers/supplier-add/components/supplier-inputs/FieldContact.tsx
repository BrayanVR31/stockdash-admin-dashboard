import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/custom-form";
import { SupplierCreate } from "@/features/suppliers/supplier-add/supplierSchema";

const FieldContact = () => {
  const { register } = useFormContext<SupplierCreate>();
  return (
    <>
      <div className="mb-4">
        <Label htmlFor="email" isRequired>
          Email
        </Label>
        <Input
          id="email"
          placeholder="Escribe el email del proveedor"
          {...register("contact.email")}
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber" isRequired>
          Número teléfonico
        </Label>
        <Input
          id="phoneNumber"
          placeholder="Escribe el número teléfonico del proveedor"
          {...register("contact.phoneNumber")}
        />
      </div>
    </>
  );
};

export { FieldContact };
