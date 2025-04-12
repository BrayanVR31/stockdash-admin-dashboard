import { useState } from "react";
import { Pencil, User, Trash2 } from "lucide-react";
import {
  GenericObject,
  getDeepValueFromObj,
  getDeepValues,
} from "@/utils/object";

interface Props<T> {
  data: T;
  objectKeys: string[];
  withImage?: boolean;
  headerCols: string[];
  selectedIds: string[];
  onSelectRow: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TableRow = <T extends GenericObject>({
  data,
  objectKeys,
  selectedIds,
  onSelectRow,
  onDelete,
  onEdit,
  withImage = false,
}: Props<T>) => {
  const id = getDeepValueFromObj(data, "_id") as unknown as string;
  const url = `${import.meta.env.VITE_API_URL}:${
    import.meta.env.VITE_API_PORT
  }`;
  const imagePath = data.image?.path || null;
  const [imageError, setImageError] = useState(false);

  return (
    <tr key={`header-row-${id}`}>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            onChange={() => onSelectRow(id)}
            checked={selectedIds.includes(id)}
          />
        </label>
      </th>
      {withImage && (
        <td>
          <div className="flex justify-start">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full bg-base-100">
                {!imagePath || imageError ? (
                  <div className="w-full h-full rounded-full flex justify-center items-center">
                    <User size={22} className="text-base-content/60" />
                  </div>
                ) : (
                  <img
                    src={`${url}/${imagePath}`}
                    alt="Item image"
                    className="object-cover w-full h-full rounded-full"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </td>
      )}
      {getDeepValues(data, ...objectKeys).map((item, index) => {
        return (
          <td key={`cell-[${index}]-${item}`}>
            {!item ? "Sin especificar" : String(item)}
          </td>
        );
      })}
      <td>
        <button
          onClick={() => onEdit(id)}
          className="btn btn-square btn-outline btn-primary max-sm:btn-xs"
        >
          <Pencil className="w-4 max-sm:w-3" />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="ml-4 btn btn-square btn-outline btn-error max-sm:btn-xs"
        >
          <Trash2 className="w-4 max-sm:w-3.5" />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
