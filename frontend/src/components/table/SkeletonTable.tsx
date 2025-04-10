import { Fragment } from "react/jsx-runtime";

interface Props {
  rows: number;
  cols: number;
}

export const SkeletonTable = ({ rows, cols }: Props) => {
  const records = Array(rows).fill(null);
  const cells = Array(cols).fill(
    <div className="skeleton h-4.5 w-full loading-bg" />
  );
  return (
    <div className="grid grid-rows-5 gap-5 min-h-[250px]">
      <div className="skeleton-header">
        {cells.map((cell, index) => (
          <Fragment key={index}>{cell}</Fragment>
        ))}
      </div>
      {records.map((_, index) => (
        <div
          className="flex py-3 px-3 gap-x-5 border-b border-gray-400/80 last:border-transparent"
          key={index + 1}
        >
          {cells.map((cell, index) => (
            <Fragment key={index}>{cell}</Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};
