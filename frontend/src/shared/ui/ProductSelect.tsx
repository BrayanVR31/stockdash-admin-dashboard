import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
} from "@shared/ui";

export function ProductSelect() {
  return (
    <Select>
      <SelectTrigger id="products">
        <SelectValue placeholder="Selecciona productos" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>Lista de productos</SelectGroupLabel>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
