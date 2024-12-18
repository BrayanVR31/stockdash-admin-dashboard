import { FiTrash2 } from "react-icons/fi";
import { TbEyeEdit } from "react-icons/tb";
import {
  TableRoot,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Btn,
  TabularData,
} from "@shared/ui";
import { DialogSupplier } from "./DialogSupplier";
import { Supplier, Address } from "../../types";

// Types
interface Props {
  data: Supplier[];
}

export function SupplierList({ data }: Props) {
  return (
    <TableRoot>
      <Table>
        <TableHead className="bg-gray-50">
          <TableRow>
            <TableHeaderCell className="text-gray-600/90">
              Nombre
            </TableHeaderCell>
            <TableHeaderCell className="text-gray-600/90">
              Estado
            </TableHeaderCell>
            <TableHeaderCell className="text-gray-600/90">
              Dirección
            </TableHeaderCell>
            <TableHeaderCell className="text-gray-600/90">
              Opciones
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="text-gray-800">{item.name}</TableCell>
              <TableCell className="text-gray-800">
                {item?.address?.state || "Sin especificar"}
              </TableCell>
              <TableCell className="text-gray-800">
                {addressFormat(item?.address)}
              </TableCell>
              <TableCell>
                <DialogSupplier data={item} />

                <Btn.Button
                  className="gap-2 mr-4"
                  type="button"
                  variant="primary"
                >
                  <TbEyeEdit />
                  <span>Editar</span>
                </Btn.Button>
                <Btn.Button
                  className="gap-2"
                  type="button"
                  variant="destructive"
                >
                  <FiTrash2 />
                  <span>Borrar</span>
                </Btn.Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
}

function addressFormat(address: Partial<Address> | undefined | null) {
  if (!address) return "";
  const street = (address.street && `c/ ${address.street}`) ?? "";
  const neighborhood = address.neighborhood && `col. ${address.neighborhood}`;
  const zipCode = (address.zipCode && `C.P. ${address.zipCode}`) ?? "";
  return `${street}, ${neighborhood}, ${zipCode}`
    .replace(", ,", "")
    .replace(/^,/, "");
}
