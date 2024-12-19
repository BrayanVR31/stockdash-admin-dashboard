import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
} from "@shared/ui";
import { useCategories } from "@hooks";

export function CategorySelect() {
  const { data } = useCategories();
  return (
    <Select>
      <SelectTrigger id="categories">
        <SelectValue placeholder="Selecciona las categorías" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>Lista de categorías</SelectGroupLabel>
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
