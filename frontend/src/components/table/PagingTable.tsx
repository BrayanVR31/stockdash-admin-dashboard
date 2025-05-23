import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSearchParams } from "react-router";
import { useTable } from "./useTable";

const PagingTable = () => {
  const { setCurrentPage, perPage, totalItems: count } = useTable();
  const [, setSearchParams] = useSearchParams();
  return (
    <Pagination.Root
      onPageChange={({ page }) => {
        setCurrentPage(page);
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("page", `${page}`);
          return newParams;
        });
      }}
      pageSize={perPage}
      count={count}
    >
      <ButtonGroup variant="ghost" size="sm">
        {/** Prev pagination button */}
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        {/** Pagination cells */}
        <Pagination.Items
          render={(page) => (
            <IconButton
              variant={{
                base: "ghost",
                _selected: "outline",
              }}
            >
              {page.value}
            </IconButton>
          )}
        />
        {/** Next pagination button */}
        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export { PagingTable };
