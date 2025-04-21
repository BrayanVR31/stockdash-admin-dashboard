import { useState } from "react";

interface Props {
  src: string | null | undefined;
  title: string;
}

const { VITE_API_URL: url, VITE_API_PORT: port } = import.meta.env;

const CellPic = ({ src, title }: Props) => {
  const basePath = `${url}:${port}/${src}`;
  const [isBroken, setIsBroken] = useState(false);
  return (
    <td className="flex items-center flex-1">
      <div className="avatar avatar-placeholder mr-2.5">
        <div className="w-10 rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
          <img
            onError={() => setIsBroken(true)}
            className={`${isBroken ? "hidden" : ""}`}
            alt={title}
            src={basePath}
          />
          {isBroken && <span>{title.charAt(0)}</span>}
        </div>
      </div>
      <p className="text-sm">{title}</p>
    </td>
  );
};

export { CellPic };
