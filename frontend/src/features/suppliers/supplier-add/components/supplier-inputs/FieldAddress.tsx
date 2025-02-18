import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label, Error } from "@/components/ui/custom-form";
import { SupplierCreate } from "@/features/suppliers/supplier-add/supplierSchema";

const FieldAddress = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SupplierCreate>();
  return (
    <>
      <div className="mb-4">
        <Label htmlFor="street">Calle</Label>
        <Input
          id="street"
          placeholder="Escribe la calle del proveedor"
          {...register("address.street")}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="state">Estado</Label>
        <Input
          id="state"
          placeholder="Escribe el estado del proveedor"
          {...register("address.state")}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="zipCode">Código postal</Label>
        <Input
          id="zipCode"
          type="number"
          placeholder="Escribe el código postal del proveedor"
          {...register("address.zipCode")}
        />
        <Error message={errors?.address?.zipCode?.message} />
      </div>
      <div>
        <Label htmlFor="neighborhood">Colonia</Label>
        <Input
          id="neighborhood"
          placeholder="Escribe la colonia del proveedor"
          {...register("address.neighborhood")}
        />
      </div>
    </>
  );
};

export { FieldAddress };
