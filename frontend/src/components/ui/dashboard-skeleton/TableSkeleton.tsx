interface Props {
  headingRows: string[];
  cells: number;
}

const TableSkeleton = ({ headingRows, cells }: Props) => {
  const cellList = Array(cells).fill("");
  const rowList = Array(headingRows.length).fill("");
  return (
    <table className="animate-pulse w-full border-spacing-2 table-fixed">
      <thead className="text-left">
        <tr>
          {headingRows.map((row) => (
            <th className="py-4">{row}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cellList.map(() => (
          <tr className="border-t">
            {rowList.map(() => (
              <td className="py-4">
                <div className="[&:nth-child(1n)]:w-[75%] [&:nth-child(4n)]:w-[45%] h-4 bg-gray-400/55 rounded-sm" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { TableSkeleton };
