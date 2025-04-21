import { SyntheticEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useTable } from "@/components/table";

const Pagination = () => {
  const {
    config: { pagination },
    dispatchConfig,
  } = useTable();
  const handleSelectPerPage = (e: SyntheticEvent<HTMLSelectElement>) => {
    dispatchConfig({
      type: "update-selected-per-page",
      payload: {
        selectedPerPage: +e.currentTarget.value,
      },
    });
  };
  const handleClickIndex = (index: number) => {
    dispatchConfig({
      type: "update-current-page",
      payload: {
        currentPage: index,
      },
    });
  };
  const handleNextIndex = () => {
    dispatchConfig({
      type: "update-next-page",
    });
  };
  const handlePrevIndex = () => {
    dispatchConfig({
      type: "update-prev-page",
    });
  };
  const indexes = Array.from(
    { length: pagination.totalItems },
    (_, i) => i + 1
  );
  return (
    <div className="paginator-table">
      <div className="grid grid-cols-2 items-center gap-x-4 max-[800px]:hidden">
        <label className="text-sm font-semibold">Filas por página</label>
        <select
          onChange={handleSelectPerPage}
          className="select select-primary"
        >
          {pagination.perPage.map((perPage) => (
            <option key={perPage} value={perPage}>
              {perPage}
            </option>
          ))}
        </select>
      </div>
      <div className="join">
        {/** The minimum length of btn indexes items */}
        {indexes.length <= 5 ? (
          indexes.map((index) => (
            <div
              onClick={() => handleClickIndex(index)}
              className={`join-item btn btn-primary btn-outline ${
                index === pagination.currentPage ? "bg-primary text-white" : ""
              }`}
              key={index}
            >
              {index}
            </div>
          ))
        ) : (
          <>
            <button
              onClick={() => handleClickIndex(1)}
              className="join-item btn btn-primary btn-outline"
            >
              <ChevronsLeft className="w-4" />
            </button>
            <button
              onClick={handlePrevIndex}
              className="join-item btn btn-primary btn-outline"
            >
              <ChevronLeft className="w-4" />
            </button>
            <div className="join-item btn-primary btn-outline btn btn-md bg-transparent hover:bg-transparent hover:text-primary">
              {pagination.currentPage === 1
                ? pagination.currentPage
                : pagination.currentPage * pagination.selectedPerPage -
                  pagination.selectedPerPage +
                  1}
              -{pagination.currentPage * pagination.selectedPerPage} de{" "}
              {pagination.totalItems * pagination.selectedPerPage}
            </div>
            <button
              onClick={handleNextIndex}
              className="join-item btn btn-primary btn-outline"
            >
              <ChevronRight className="w-4" />
            </button>
            <button
              onClick={() => handleClickIndex(pagination.totalItems)}
              className="join-item btn btn-primary btn-outline"
            >
              <ChevronsRight className="w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/*

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

      <div
        onClick={() => {
          updatePage(1);
          setSliceItems([...preLeftItems.slice(1, preLeftItems.length)]);
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
        onClick={() => null}
        className={`join-item btn ${paginating.currentPage === listItems.length ? "btn-disabled" : ""} max-[800px]:btn-sm`}
      >
        <span className="max-[800px]:hidden">Siguiente</span>
        <ChevronRight className="w-3.5" />
      </div>
    </>
  )}
</div>
*/

export default Pagination;
