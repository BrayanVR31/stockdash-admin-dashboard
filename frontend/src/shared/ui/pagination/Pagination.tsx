import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { Btn } from "@shared/ui";
import SelectPerPage from "./SelectPerPage";
import { usePaginationCtx } from "./context";

// Types
interface Props {
  total: number; // Length of total results of data
  name: string; // The name or identifier for request data (users, supplier, etc.)
}

export function Pagination({ total, name }: Props) {
  const { perPage } = usePaginationCtx();
  // Configuration of paginator
  const totalPages = Math.ceil(total / perPage);
  return (
    <div className="flex items-center justify-between py-8">
      <span className="text-sm font-semibold text-slate-700">
        Total de {name}: {total}
      </span>
      <div className="flex gap-x-2">
        <TriggerIndexTo direction="prev" totalPages={totalPages} />
        {/** Set of index button */}
        <PagesInterval pagesLength={totalPages} />
        <TriggerIndexTo direction="next" totalPages={totalPages} />
      </div>
      <div className="flex items-center gap-x-4">
        <SelectPerPage
          selectTag={"Mostrar por página:"}
          selectOptions={[
            { label: "5", value: "5" },
            { label: "10", value: "10" },
          ]}
        />
      </div>
    </div>
  );
}

// Button to advance on each prev or next action
interface TriggerIndexToProps {
  totalPages: number;
  direction: "prev" | "next";
}

function TriggerIndexTo({ totalPages, direction }: TriggerIndexToProps) {
  const triggerSettings = {
    next: {
      icon: <HiChevronRight className="text-lg" />,
      description: "Siguiente",
    },
    prev: {
      icon: <HiChevronLeft className="text-lg" />,
      description: "Anterior",
    },
  };
  const { page, setPage } = usePaginationCtx();
  const handleClick = () => {
    if (direction === "next") setPage(page + 1);
    else if (direction === "prev") setPage(page - 1);
  };
  const onDisabledAction = () => {
    if (direction === "next") return page === totalPages;
    else if (direction === "prev") return page === 1;
  };
  return (
    <Btn.Button
      disabled={onDisabledAction()}
      variant="secondary"
      onClick={handleClick}
    >
      <span>{triggerSettings[direction].description}</span>
      {triggerSettings[direction].icon}
    </Btn.Button>
  );
}

interface PagesIntervalProps {
  pagesLength: number;
}

function PagesInterval({ pagesLength }: PagesIntervalProps) {
  const { setPage, page } = usePaginationCtx();
  const pageItems = new Array(pagesLength)
    .fill(null)
    .map((_, index) => index + 1);
  const buttonClass = "w-8 h-8";
  const activeClass = (currentIndex: number) =>
    currentIndex === page
      ? "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
      : "";
  return (
    <div className="flex items-center gap-x-2">
      {pageItems.map((index) => (
        <Btn.Button
          onClick={() => setPage(index)}
          variant="secondary"
          className={`${buttonClass} ${activeClass(index)}`}
        >
          {index}
        </Btn.Button>
      ))}
    </div>
  );
}
