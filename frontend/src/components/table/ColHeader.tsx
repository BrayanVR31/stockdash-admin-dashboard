import { MoveUp } from "lucide-react";
import { useTable, Order } from ".";
import { useCallback } from "react";

interface Props {
  colName: string;
  colKey: string;
}

type InverseOrder = {
  [key in Order]: Order;
};

const ColHeader = ({ colName, colKey }: Props) => {
  const { sorting, updateColumnName, updateColumnOrder } = useTable();

  // Create a memoized handler for better performance and cleaner component
  const handleSort = useCallback(() => {
    console.log("Handle sort clicked for column:", colKey);
    console.log("Current sorting state:", sorting);

    const reversedOrder: InverseOrder = {
      asc: "desc",
      desc: "asc",
    };

    // If we're clicking on a different column than the one currently sorted
    if (sorting.colName !== colKey) {
      console.log("Setting new column name first:", colKey);
      updateColumnName(colKey);

      // Small delay to ensure the column name is set before changing order
      setTimeout(() => {
        console.log("Setting order to asc");
        updateColumnOrder("asc");
      }, 10);
    } else {
      // If clicking on the same column, just toggle the sort order
      const newOrder = reversedOrder[sorting.order];
      console.log("Toggling order to:", newOrder);
      updateColumnOrder(newOrder);
    }
  }, [colKey, sorting, updateColumnName, updateColumnOrder]);

  // Derive computed properties for clarity
  const isActive = sorting.colName === colKey;
  const isDescending = isActive && sorting.order === "desc";

  return (
    <th className="cursor-pointer group/sort-col">
      <div className="flex justify-between items-center">
        {colName}
        <span
          onClick={handleSort}
          className="btn btn-neutral btn-circle btn-ghost btn-md opacity-0 group-hover/sort-col:opacity-100"
        >
          <MoveUp
            className={`transition-transform duration-300 ${
              isDescending ? "rotate-180" : ""
            }`}
            size={17}
          />
        </span>
      </div>
    </th>
  );
};

export default ColHeader;
