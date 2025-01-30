interface Props {
  label?: string;
  symbol: string;
}

function Emoji({ label, symbol }: Props) {
  return (
    <span
      arial-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
    >
      {symbol}
    </span>
  );
}

export { Emoji };
