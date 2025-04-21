interface Props {
  isActive?: boolean | undefined | null;
}

const CellStatus = ({ isActive = false }: Props) => {
  return (
    <td className="flex-1 self-center">
      <span
        className={`badge badge-soft ${
          isActive ? "badge-success" : "badge-error"
        }`}
      >
        {isActive ? "Activo" : "No activo"}
      </span>
    </td>
  );
};

export { CellStatus };
