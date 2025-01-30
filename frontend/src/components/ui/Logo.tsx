import { Layers } from "lucide-react";

type Variation = "small" | "large" | "medium";

type VariationType = { iconSize: number; box: string };

type MatchVariation = { [k in Variation]: VariationType };

interface Props {
  variation?: Variation;
}

function Logo({ variation = "medium" }: Props) {
  const matchVariation: MatchVariation = {
    medium: { box: "w-12 h-12", iconSize: 24.5 },
    large: { box: "w-18 h-18", iconSize: 32.5 },
    small: { box: "w-8 h-8", iconSize: 15 },
  };
  return (
    <div
      className={`${matchVariation[variation].box} flex items-center justify-center text-sky-100 rounded-full bg-gradient-to-r from-sky-500 to-blue-700`}
    >
      <Layers size={matchVariation[variation].iconSize} />
    </div>
  );
}

export { Logo };
