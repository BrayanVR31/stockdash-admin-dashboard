interface Props {
  message?: string;
}

const Error = ({ message }: Props) => {
  if (!message) return null;
  return <span className="block mt-2 text-sm text-red-300/90">{message}</span>;
};

export { Error };
