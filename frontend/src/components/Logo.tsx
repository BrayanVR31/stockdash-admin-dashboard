import { Layers } from "lucide-react";

interface Props {
  showTitle?: boolean;
}

const Logo = ({ showTitle = false }: Props) => {
  return (
    <div className="flex items-center">
      <div className="bg-primary w-10 aspect-square rounded-full flex items-center justify-center flex-wrap">
        <Layers className="w-5 text-white" />
      </div>
      {showTitle && <span className="font-semibold ml-3.5">Stockdash</span>}
    </div>
  );
};

export default Logo;
