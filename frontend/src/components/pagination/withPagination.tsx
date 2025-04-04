import { ComponentType, JSX, useState } from "react";
import { usePagination } from "./PaginationProvider";

interface InjectedPaginationProps {
  totalItems: number;
}

type SlicedPagination = [number[], number[]];

const withPagination = <T,>(Component: ComponentType<T>) => {
  type Props = T & InjectedPaginationProps;
  return (props: Props) => {
    const { currentPage, setCurrentPage } = usePagination();
    const [slicedItems, setSlicedItems] = useState<SlicedPagination>();
    const { totalItems, ...rest } = props;
    const perPage = 10; // TODO: Change dynamically by select option
    const total = Math.ceil(totalItems / perPage);
    const listItems = Array(total)
      .fill(null)
      .map((_, index) => index + 1);
    const handleOnNextItem = (page: number) => () => {
      setCurrentPage(page);
    };
    console.log(listItems.slice(0, 2));
    return (
      <>
        <Component {...(rest as T & JSX.IntrinsicAttributes)} />
        <div className="flex justify-center mt-6">
          <div className="join">
            {total <= 5 ? (
              listItems.map((item) => (
                <div
                  onClick={handleOnNextItem(item)}
                  key={item}
                  className={`join-item btn ${item === currentPage ? "btn-primary" : ""}`}
                >
                  {item}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  };
};

export default withPagination;
