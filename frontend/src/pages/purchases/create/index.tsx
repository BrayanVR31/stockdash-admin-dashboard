import { FormHeader, RegistryLayout } from "@shared/ui";

export function Create() {
  return (
    <RegistryLayout>
      <FormHeader
        title="Registra producto"
        description="Agrega la información necesaria para registrar una compra, todos los campos que están marcados con un asterisco son obligatorios."
      />
    </RegistryLayout>
  );
}
