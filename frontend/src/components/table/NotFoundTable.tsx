import { Database, PackageOpen } from "lucide-react";

const NotFoundTable = () => {
  return (
    <div className="text-center text-gray-500 flex flex-col items-center justify-center gap-2 flex-wrap">
      <div className="relative flex items-center justify-center">
        {/* Background Database icon */}
        <div
          className="absolute right-0 text-primary/40"
          style={{
            transform: "translate(20%, 20%)",
            zIndex: 1,
          }}
        >
          <Database size={40} />
        </div>

        {/* Foreground PackageOpen icon */}
        <div
          className="text-primary/30"
          style={{
            transform: "translate(-20%, -20%)",
            zIndex: 2,
          }}
        >
          <PackageOpen size={85} />
        </div>
      </div>
      <span>No hay datos para mostrar</span>
    </div>
  );
};

export default NotFoundTable;
