import { FormHeader, RegistryLayout } from "@shared/ui";
import { PurchaseForm } from "./components";

export function Create() {
  return (
    <RegistryLayout>
      <FormHeader
        title="Registrar compra"
        description="Agrega la información necesaria para registrar una compra, todos los campos que están marcados con un asterisco son obligatorios."
      />
      <PurchaseForm />
    </RegistryLayout>
  );
}
