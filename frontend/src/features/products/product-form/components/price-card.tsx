import { Controller, useFormContext } from "react-hook-form";
import { ProductForm } from "../form-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/custom-form";
import { FormCard, CardTitle } from "./form-card";
import { Error } from "@/components/ui/custom-form";

function PriceCard() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductForm>();
  return (
    <FormCard HeaderCard={Header}>
      <div className="mb-8 relative">
        <Label htmlFor="purchase" isRequired>
          Compra
        </Label>
        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value, ref } }) => (
            <Input
              id="purchase"
              type="number"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              ref={ref}
            />
          )}
          name="price.purchase"
        />
        <Error message={errors.price?.purchase?.message} />
      </div>
      <div className="relative mb-8">
        <Label htmlFor="sale" isRequired>
          Venta
        </Label>

        <Controller
          control={control}
          name="price.sale"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              id="sale"
              type="number"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Error message={errors.price?.sale?.message} />
      </div>
    </FormCard>
  );
}

function Header() {
  return (
    <>
      <CardTitle>Precios del producto</CardTitle>
    </>
  );
}

export { PriceCard };
