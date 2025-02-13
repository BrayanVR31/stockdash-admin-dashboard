interface Props {
  message?: string;
}

const Error = ({ message }: Props) => {
  if (!message) return null;
  return (
    <span className="absolute block -bottom-1 translate-y-full text-sm text-red-300/90">
      {message}
    </span>
  );
};

export { Error };
