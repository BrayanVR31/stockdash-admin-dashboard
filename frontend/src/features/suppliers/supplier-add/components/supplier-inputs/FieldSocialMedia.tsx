import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/custom-form";
import { SupplierCreate } from "@/features/suppliers/supplier-add/supplierSchema";

const FieldSocialMedia = () => {
  const { register } = useFormContext<SupplierCreate>();
  return (
    <>
      <div>
        <Label htmlFor="facebook" isRequired>
          Facebook
        </Label>
        <Input
          id="facebook"
          placeholder="Escribe el url de la red social del proveedor"
          {...register("socialMedia.facebook")}
        />
      </div>
      <div>
        <Label htmlFor="tiktok" isRequired>
          Tiktok
        </Label>
        <Input
          id="tiktok"
          placeholder="Escribe el url de la red social del proveedor"
          {...register("socialMedia.tiktok")}
        />
      </div>
      <div>
        <Label htmlFor="twitter" isRequired>
          Twitter
        </Label>
        <Input
          id="twitter"
          placeholder="Escribe el url de la red social del proveedor"
          {...register("socialMedia.twitter")}
        />
      </div>
    </>
  );
};

export { FieldSocialMedia };
