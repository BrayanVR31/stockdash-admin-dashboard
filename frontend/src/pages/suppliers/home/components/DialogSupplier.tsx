import { ReactNode } from "react";
import { TbEye } from "react-icons/tb";
import { Btn, DialogTitle, DialogFooter, DialogClose } from "@shared/ui";
import { Supplier, SocialMedia } from "../../types";
import { DialogOverview } from "./DialogOverview";
import { SocialMediaList } from "./SocialMediaList";

// Types
interface Props {
  data: Supplier;
}

export function DialogSupplier({ data }: Props) {
  const button = (
    <Btn.Button className="gap-2 mr-4" type="button" variant="secondary">
      <TbEye />
      <span>Visualizar</span>
    </Btn.Button>
  );
  return (
    <DialogOverview triggerButton={button} footer={<Footer />}>
      <DialogTitle>Detalles del proveedor</DialogTitle>
      <ul className="max-w-full mb-8">
        {/** Basic overview info */}
        <DescriptionList title="Información general">
          <DescriptionItem label="Nombre">
            <span className="font-normal text-gray-700">{data?.name || "Sin especificar"}</span>
          </DescriptionItem>
          <DescriptionItem label="Redes sociales">
            <div className="flex gap-2">
              { 
                data.socialMedia ? 
                  <SocialMediaList links={data.socialMedia as SocialMedia} /> :
                  <span className="font-normal text-gray-700">Sin especificar</span>
              }
            </div>
          </DescriptionItem>
        </DescriptionList>

        {/** Address overview info */}
        <DescriptionList title="Dirección">
          <DescriptionItem label="Calle">
            <span className="font-normal text-gray-700">{data?.address?.street || "Sin especificar"}</span>
          </DescriptionItem>
          <DescriptionItem label="Estado">
            <span className="font-normal text-gray-700">{data?.address?.state || "Sin especificar"}</span>
          </DescriptionItem>
          <DescriptionItem label="Colonia">
            <span className="font-normal text-gray-700">{data?.address?.neighborhood || "Sin especificar"}</span>
          </DescriptionItem>
          <DescriptionItem label="Código postal">
            <span className="font-normal text-gray-700">{data?.address?.zipCode || "Sin especificar"}</span>
          </DescriptionItem>
        </DescriptionList>
      </ul>
    </DialogOverview>
  );
}

function Footer() {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Btn.Button variant="secondary">Cancelar</Btn.Button>
      </DialogClose>
    </DialogFooter>
  );
}

interface DescriptionListProps {
  title: string;
  children: ReactNode;
}

function DescriptionList({ title, children }: DescriptionListProps) {
  return (
    <li className="mt-4 border-b-2 border-gray-200 pb-4">
      {/** Sub-list title */}
      <span className="text-sm block font-semibold text-gray-700 mb-4">
        {title}
      </span>
      {/** SUb-list content */}
      <ul>{children}</ul>
    </li>
  );
}

interface DescriptionItemProps {
  label: string;
  children: ReactNode;
}

function DescriptionItem({ children, label }: DescriptionItemProps) {
  return (
    <li className="text-gray-500 font-semibold text-sm grid grid-cols-2 py-2">
      <span>{label}</span>
      {children}
    </li>
  );
}