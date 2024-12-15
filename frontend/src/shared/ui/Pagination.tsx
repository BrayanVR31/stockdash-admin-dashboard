import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { Btn } from "@shared/ui";

// Types
interface Props {
	total: number; /** Length of data retrived by data request */
	paginatorName: string;
  perPage: number;
}

export function Pagination({ total, paginatorName, perPage }: Props) {
	const { setPage, page } = usePaginationCtx();
  // Settings of pagination behavior
  const limitIndexes = 5; // This value specify the maximum number of rendered items to show
  // Array of pages 
	const totalPages = Math.ceil(total / perPage);
  const totalIndexes = new Array(totalPages).fill(null).map((_, index)=>(
    { index: index+1, isVisible: true }
  ));
  const filteredIndexes = totalIndexes;
  console.log({ totalPages, totalIndexes, filteredIndexes});
  return (
		<div className="flex items-center justify-between">
			<span>Total de {paginatorName}: {total} </span>
			<div className="flex gap-x-2">
				<Btn.Button disabled={page === 1} variant="secondary" onClick={() => setPage(page - 1)}>
					<HiChevronLeft className="text-lg" />
					<span>Anterior</span>
				</Btn.Button>
        {/** Set of index button */}
        <PagesInterval pages={totalIndexes} activeIndex={page}/>
				<Btn.Button disabled={page === totalPages} variant="secondary" onClick={() => setPage(page + 1)}>
					<span>Siguiente</span>
					<HiChevronRight className="text-lg" />
				</Btn.Button>
			</div>
			<div>
				<span>Mostrar por cada página</span>
			</div>
		</div>
	);
}

interface Page {
  index: number;
  isVisible: true;
}

interface PagesIntervalProps {
  pages: Page[];
  activeIndex: number;
}

function PagesInterval({ pages, activeIndex }: Props) {
  const { setPage, page } = usePaginationCtx();
  const buttonClass = "w-8 h-8";
  const activeClass = (currentIndex: number) => currentIndex === activeIndex ? "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800" : "";
  return (
    <div className="flex items-center gap-x-2">
      { pages.map(({ index }) => (
        <Btn.Button onClick={() => setPage(index)} variant="secondary" className={`${buttonClass} ${activeClass(index)}`}>{ index }</Btn.Button>
      ))}
    </div>
  );
}

// Context
interface PaginationInt {
	page: number;
	setPage: Dispatch<SetStateAction<number>>
}

const paginationContext = createContext<PaginationInt>({
	page: 1,
	setPage: () => null
});

export const PaginationProvider = paginationContext.Provider;

export function usePaginationCtx() {
	return useContext(paginationContext);
}


