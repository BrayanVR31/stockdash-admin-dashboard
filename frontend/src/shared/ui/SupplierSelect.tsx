import { FormEventHandler } from "react";
import MultipleSelect, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
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

export function SupplierSelect() {
  const { data } = useSuppliers();

  return (
    <Select>
      <SelectTrigger id="suppliers">
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

// Multiple select on suppliers data
const animatedComponents = makeAnimated();

interface SelectMulti {
  value: any;
  label: any;
}

interface SupplierMultiSelectProps {
  onMultiSelect?: (values: string[]) => void;
}

export function SupplierMultiSelect({
  onMultiSelect,
}: SupplierMultiSelectProps) {
  const { data } = useSuppliers();
  // Event handlers
  const onMultipleSelect = (event: MultiValue<unknown>) => {
    onMultiSelect &&
      onMultiSelect(event.map((item) => (item as SelectMulti).value as string));
  };
  return (
    <MultipleSelect
      onChange={onMultipleSelect}
      components={animatedComponents}
      isMulti
      options={data?.results.map((item) => ({
        value: item._id,
        label: item.name,
      }))}
    />
  );
}
