import { FormHeader, RegistryLayout } from "@shared/ui";
import { ProductForm } from "./components";

export function Create() {
  return (
    <RegistryLayout>
      <FormHeader
        title="Registra producto"
        description="Agrega la información necesaria para crear un producto, todos los campos que están marcados con un asterisco son obligatorios."
      />
      <ProductForm />
    </RegistryLayout>
  );
}
