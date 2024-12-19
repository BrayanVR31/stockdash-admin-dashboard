import { forwardRef, FormEventHandler } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
} from "@shared/ui";
import { useSuppliers } from "@hooks";

// Types
interface Props {
  onChange: FormEventHandler<HTMLSelectElement>;
}

function SelectField() {
  const { data } = useSuppliers();
  return (
    <Select>
      <SelectTrigger  id="suppliers">
        <SelectValue placeholder="Selecciona proveedores" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>Lista de proveedores</SelectGroupLabel>
          {data?.results.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export const SupplierSelect = SelectField;
