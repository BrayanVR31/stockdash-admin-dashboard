import {
  ArrowUpDown,
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  LucideIcon,
} from "lucide-react";
import { JSX } from "react";
import "./column.css";
import { useTable } from "@/components/table/context";

type Config = {
  sortable: boolean;
};

interface Props {
  title: string;
  path: string /** Object key to render each column data */;
  colConfig?: Partial<Config>;
  render: () => void;
}

type sortOrder = "asc" | "desc";

const matchSort: Record<sortOrder, JSX.Element> = {
  asc: <ArrowUpNarrowWide />,
  desc: <ArrowDownNarrowWide />,
};

const defaultConfig: Config = {
  sortable: false,
};

const Column = ({ title, path, colConfig = defaultConfig, render }: Props) => {
  const { sortable } = colConfig;
  const { dispatchConfig, config } = useTable();
  const handleClick = () => {
    console.log(config);
    if (sortable) {
      dispatchConfig({
        type: "update-sort-path",
        payload: {
          path,
        },
      });
      dispatchConfig({
        type: "update-sort-order",
        payload: {
          order: config.sorting.order === "asc" ? "desc" : "asc",
        },
      });
    }
  };

  const getSortIcon = (path: string, order: sortOrder) => {
    if (path === config.sorting.path) {
      return matchSort[order];
    }
    return <ArrowUpDown />;
  };
  return (
    <th
      onClick={handleClick}
      data-sortable={sortable ? "active" : ""}
      className={`col-header ${path === config.sorting.path ? "active" : ""}`}
    >
      <span>{title}</span>
      {sortable && getSortIcon(path, config.sorting.order)}
    </th>
  );
};

export { Column };
