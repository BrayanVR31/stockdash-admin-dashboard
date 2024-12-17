import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@shared/ui";
import { usePaginationCtx } from "./context";

// Types
interface SelectOpt {
  value: string;
  label: string;
}

interface Props {
  selectOptions: SelectOpt[];
  selectTag: string;
}

function SelectPerPage({ selectOptions, selectTag }: Props) {
  const { setPerPage, perPage } = usePaginationCtx();
  console.log("select per page: ", perPage.toString());
  return (
    <>
      <label
        className="text-sm font-semibold text-slate-600"
        htmlFor="per-page"
      >
        {selectTag}
      </label>
      <div className="min-w-18">
        <Select
          defaultValue={perPage.toString()}
          onValueChange={(e) => setPerPage(Number(e))}
        >
          <SelectTrigger id="per-page">
            <SelectValue placeholder="5" />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default SelectPerPage;
