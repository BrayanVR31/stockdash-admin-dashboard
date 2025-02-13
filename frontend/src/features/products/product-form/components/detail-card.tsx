import { memo, ReactNode } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { ProductForm } from "../form-schema";
import { Input } from "@/components/ui/input";
import { Label, Error } from "@/components/ui/custom-form";
import { Textarea } from "@/components/ui/textarea";
import { FormCard, CardTitle } from "./form-card";

function DetailHeader() {
  return (
    <>
      <CardTitle>Detalles del producto</CardTitle>
    </>
  );
}

interface Props {
  children: ReactNode;
}

const DetailCard = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductForm>();
  return (
    <FormCard className="h-fit" HeaderCard={DetailHeader}>
      {/** Product name */}
      <div className="mb-8 relative">
        <Label isRequired htmlFor="name">
          Nombre
        </Label>
        <Input id="name" {...register("name")} />
        <Error message={errors.name?.message} />
      </div>
      {/** Product quantity */}
      <div className="mb-8 relative">
        <Label htmlFor="quantity">Cantidad</Label>
        <Input type="number" id="quantity" {...register("quantity")} />
        <Error message={errors.quantity?.message} />
      </div>
      {/** Product description */}
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" {...register("description")} />
      </div>
    </FormCard>
  );
};

export { DetailCard };
