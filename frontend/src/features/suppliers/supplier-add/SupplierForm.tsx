import { FormEventHandler } from "react";
import {
  FieldName,
  FieldAddress,
  FieldContact,
  FieldSocialMedia,
  FieldImage,
} from "./components/supplier-inputs";
import { FormCard, CardTitle } from "@/components/ui/custom-form";

interface Props {
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const SupplierForm = ({ onSubmit }: Props) => {
  return (
    <form id="supplier-form" onSubmit={onSubmit}>
      <div className="grid gap-x-4 gap-y-4 xl:grid-cols-product xl:grid-rows-product auto-rows-product grid-flow-row grid-cols-1">
        <FormCard header={<CardTitle>Información del proveedor</CardTitle>}>
          <div className="mb-4">
            <FieldName />
          </div>
          <div>
            <FieldImage />
          </div>
        </FormCard>
        <FormCard
          className="xl:col-start-1"
          header={<CardTitle>Dirección del proveedor</CardTitle>}
        >
          <div>
            <FieldAddress />
          </div>
        </FormCard>
        <FormCard
          className="xl:col-start-2 xl:row-start-1 xl:row-span-2"
          header={<CardTitle>Contacto del proveedor</CardTitle>}
        >
          <div className="mb-8">
            <FieldContact />
          </div>
          <div>
            <FieldSocialMedia />
          </div>
        </FormCard>
      </div>
    </form>
  );
};

export default SupplierForm;
