import { FC } from "react";
import { ArrowDownUp, Search, PackageX } from "lucide-react";

interface Props {
  headerCols: string[];
  onSearch: (value: string) => void;
  searchValue: string;
  onBulkDelete?: () => void;
  selectedCount: number;
}

const TableHeader: FC<Props> = ({
  headerCols,
  onSearch,
  searchValue,
  onBulkDelete,
  selectedCount,
}) => (
  <div className="mb-6 flex justify-between items-center">
    <label className="input input-primary w-max">
      <Search className="w-3.5" />
      <input
        onChange={(e) => onSearch(e.target.value)}
        value={searchValue}
        type="search"
        placeholder="Busca los datos de la tabla"
        className="max-sm:w-20"
      />
    </label>
    <div className="flex gap-4">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-outline btn-primary">
          <PackageX className="w-4" />
          <span className="hidden sm:block">Eliminar</span>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 border border-gray-500 shadow-md"
        >
          <li>
            <button
              onClick={onBulkDelete}
              className="hover:bg-primary hover:text-white"
              disabled={selectedCount === 0}
            >
              Eliminar {selectedCount > 0 ? `(${selectedCount})` : ""}{" "}
              seleccionados
            </button>
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-end dropdown-bottom">
        <div tabIndex={0} role="button" className="btn btn-outline btn-primary">
          <ArrowDownUp className="w-4" />
          <span className="hidden sm:block">Ordenar</span>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 border border-gray-500 shadow-md"
        >
          {headerCols.map((col, index) => (
            <li key={`${col}-${index}`}>
              <button className="hover:bg-primary hover:text-white">
                {col}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default TableHeader;
