import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { SelectMenu, Option } from "@/components/ui/select-menu";
import { usePagination } from "@/context/pagination";

interface Props {
  total: number;
}

const Paginator = ({ total }: Props) => {
  const [, setSearchParams] = useSearchParams();
  const { pagination, setPagination } = usePagination();
  const options = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 25, label: "25" },
  ];
  const paginationLimit = Math.ceil(total / pagination.perPage);
  // Event handlers
  const handleCurrentPage = (index: number) => {
    return () => {
      setPagination({ ...pagination, page: index });
      setSearchParams({ page: `${index}` });
    };
  };
  const handleAnotherPage = (state: "next" | "prev") => {
    return () => {
      if (state === "next" && pagination.page < paginationLimit)
        setPagination({ ...pagination, page: pagination.page + 1 });
      else if (state === "prev" && pagination.page > 1)
        setPagination({ ...pagination, page: pagination.page - 1 });
    };
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center">
        <div className="flex items-center gap-x-2">
          <span>Filas por página</span>
          <SelectMenu
            menuPosition="absolute"
            menuPlacement="top"
            options={options}
            defaultValue={options.find(
              (opt) => opt.value === pagination.perPage
            )}
            onChange={(option) =>
              setPagination({
                ...pagination,
                perPage: (option as Option<number>).value,
              })
            }
          />
        </div>
        <span className="inline-block ml-2">de {total} elementos</span>
      </div>
      <Pagination className="w-fit mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              path={{ pathname: ".", search: `?page=${pagination.page - 1}` }}
              className={`${
                pagination.page === 1
                  ? "cursor-not-allowed pointer-events-none opacity-50"
                  : ""
              }`}
              onClick={handleAnotherPage("prev")}
            />
          </PaginationItem>
          {Array(paginationLimit)
            .fill(1)
            .map((item, index) => (
              <PaginationItem key={`tab-index-${index}`}>
                <PaginationLink
                  className={`${
                    pagination.page === index + item
                      ? "dark:bg-blue-800 bg-blue-700 text-white hover:bg-blue-700/90 dark:hover:bg-blue-800/80 hover:text-white"
                      : ""
                  } transition-colors duration-500`}
                  onClick={handleCurrentPage(index + item)}
                  path={{ pathname: ".", search: `?page=${index + item}` }}
                >
                  {item + index}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem>
            <PaginationNext
              onClick={handleAnotherPage("next")}
              path={{ pathname: ".", search: `?page=${pagination.page + 1}` }}
              className={`${
                pagination.page === paginationLimit
                  ? "cursor-not-allowed pointer-events-none opacity-50"
                  : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export { Paginator };
