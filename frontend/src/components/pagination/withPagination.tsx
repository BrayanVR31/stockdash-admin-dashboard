import { ComponentType, JSX, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTable, PaginationTable } from "@/components/table";

interface InjectedPaginationProps {
  totalItems: number;
}

const withPagination = <T,>(Component: ComponentType<T>) => {
  type Props = T & InjectedPaginationProps;
  return (props: Props) => {
    const { paginating, updatePage, updatePerPage } =
      useTable() as PaginationTable;

    const { totalItems, ...rest } = props;
    // TODO: Change dynamically by select option
    const total = Math.ceil(totalItems / paginating.perPage);
    const listItems = Array(total)
      .fill(null)
      .map((_, index) => index + 1);
    const [sliceItems, setSliceItems] = useState<number[]>(
      listItems.slice(1, 5),
    );
    const preRightItems = listItems.slice(
      listItems.length - 4,
      listItems.length,
    );
    const preLeftItems = listItems.slice(0, 4);

    const handleOnNextItem = () => {
      const nextItem = paginating.currentPage + 1;
      const lastSliceItem = [...sliceItems].pop();
      if (nextItem === lastSliceItem && !preRightItems.includes(nextItem)) {
        const startIndex = listItems.indexOf(nextItem);
        const endIndex = startIndex + 3;
        setSliceItems(listItems.slice(startIndex, endIndex));
      } else if (preRightItems.includes(nextItem)) {
        setSliceItems([
          preRightItems[0] - 1,
          ...preRightItems.slice(0, preRightItems.length - 1),
        ]);
      }
      updatePage(nextItem);
    };
    const handleOnPrevItem = () => {
      const prevItem = paginating.currentPage - 1;
      const lastItem = [...preLeftItems].pop();
      if (prevItem <= lastItem! || preRightItems.includes(prevItem)) {
        if (preRightItems.includes(prevItem)) {
          setSliceItems([
            preRightItems[0] - 1,
            ...preRightItems.slice(0, preRightItems.length - 1),
          ]);
        } else {
          setSliceItems([
            ...preLeftItems.slice(1, preLeftItems.length),
            preLeftItems.length + 1,
          ]);
        }
      } else {
        const startIndex = listItems.indexOf(prevItem);
        const endIndex = startIndex + 3;
        setSliceItems(listItems.slice(startIndex, endIndex));
      }
      updatePage(prevItem);
    };
    return (
      <>
        <Component {...(rest as T & JSX.IntrinsicAttributes)} />
        <div className="flex items-center justify-between mt-6">
          <div className="grid grid-cols-2 items-center gap-x-4 max-[800px]:hidden">
            <label className="text-sm font-semibold">Filas por página</label>
            <select
              onChange={(e) => updatePerPage(+e.target.value)}
              value={paginating.perPage}
              className="select select-primary"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="join">
            {total <= 5 ? (
              listItems.map((item) => (
                <div
                  onClick={() => updatePage(item)}
                  key={item}
                  className={`join-item btn ${item === paginating.currentPage ? "btn-primary" : ""}`}
                >
                  {item}
                </div>
              ))
            ) : (
              <>
                <div
                  className={`join-item btn ${paginating.currentPage === 1 ? "btn-disabled" : ""} max-[800px]:btn-sm`}
                  onClick={handleOnPrevItem}
                >
                  <ChevronLeft className="w-3.5" />
                  <span className="max-[800px]:hidden">Atras</span>
                </div>
                {/** Partial items sliced from listItems */}
                <div
                  onClick={() => {
                    updatePage(1);
                    setSliceItems([
                      ...preLeftItems.slice(1, preLeftItems.length),
                    ]);
                  }}
                  className={`join-item btn ${1 === paginating.currentPage ? "btn-primary" : ""} max-[800px]:btn-sm`}
                >
                  1
                </div>
                <div
                  className={`join-items btn btn-disabled max-[800px]:btn-sm ${!preLeftItems.includes(paginating.currentPage) ? "" : "hidden"}`}
                >
                  ...
                </div>
                {sliceItems.map((item) => (
                  <div
                    key={item}
                    onClick={() => updatePage(item)}
                    className={`join-item btn ${item === paginating.currentPage ? "btn-primary" : ""} max-[800px]:btn-sm`}
                  >
                    {item}
                  </div>
                ))}
                <div
                  className={`join-items btn btn-disabled max-[800px]:btn-sm ${!preRightItems.includes(paginating.currentPage) ? "" : "hidden"}`}
                >
                  ...
                </div>
                <div
                  onClick={() => {
                    updatePage(listItems.length);
                    setSliceItems([
                      preRightItems[0] - 1,
                      ...preRightItems.slice(0, preRightItems.length - 1),
                    ]);
                  }}
                  className={`join-item btn ${listItems.length === paginating.currentPage ? "btn-primary" : ""} max-[800px]:btn-sm`}
                >
                  {listItems.length}
                </div>
                <div
                  onClick={handleOnNextItem}
                  className={`join-item btn ${paginating.currentPage === listItems.length ? "btn-disabled" : ""} max-[800px]:btn-sm`}
                >
                  <span className="max-[800px]:hidden">Siguiente</span>
                  <ChevronRight className="w-3.5" />
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  };
};

export default withPagination;
