// Types
interface Props {
  title: string;
  description: string;
}

export function FormHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-4xl mb-4">{title}</h3>
      <p className="text-[1rem] text-slate-800">{description}</p>
    </div>
  );
}
