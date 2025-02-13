import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { SelectMenu, Option } from "@/components/ui/select-menu";
import { useProduct } from "@/hooks";
import { usePagination } from "@/context/pagination";

const Paginator = () => {
  const { getList: products } = useProduct();
  const { pagination, setPagination } = usePagination();
  const options = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 25, label: "25" },
  ];
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
              (opt) => opt.value === pagination.perPage,
            )}
            onChange={(option) =>
              setPagination({
                ...pagination,
                perPage: (option as Option<number>).value,
              })
            }
          />
        </div>
        <span className="inline-block ml-2">
          de {products.data.total} elementos
        </span>
      </div>
      <Pagination className="w-fit mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {Array(Math.ceil(products.data.total / pagination.perPage))
            .fill(1)
            .map((item, index) => (
              <PaginationItem key={`tab-index-${index}`}>
                <PaginationLink
                  isActive={pagination.page === index + item}
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      page: item + index,
                    })
                  }
                  href="#"
                >
                  {item + index}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginator;
