interface Props {
  date: Date;
}

const CellDate = ({ date }: Props) => {
  const dateFormatter = new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <td className="flex-1 self-center">
      {dateFormatter.format(new Date(date))}
    </td>
  );
};

export { CellDate };
