import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "@/components/ui/dashboard-crud";
import SupplierForm from "./SupplierForm";
import {
  supplierSchema,
  SupplierCreate,
} from "@/features/suppliers/supplier-add/supplierSchema";

const SupplierAdd = () => {
  const { ...methods } = useForm<SupplierCreate>({
    resolver: zodResolver(supplierSchema),
  });
  const { handleSubmit } = methods;
  // Event handlers
  const onSubmit: SubmitHandler<SupplierCreate> = (data) => console.log(data);
  return (
    <div>
      <Header title="Registra proveedor">
        <input
          className="bg-blue-700 text-white px-4 flex rounded-md cursor-pointer text-sm py-2 hover:bg-blue-700/80 transition-colors duration-500"
          type="submit"
          form="supplier-form"
          value="Crear"
        />
      </Header>
      <FormProvider {...methods}>
        <SupplierForm
          onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
        />
      </FormProvider>
    </div>
  );
};

export { SupplierAdd };
