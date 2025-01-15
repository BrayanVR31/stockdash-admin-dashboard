import { ReactNode } from "react";
import { ShieldQuestion, ShieldCheck, ShieldX } from "lucide-react";

interface Variation {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

type MessageType = "auth-info" | "auth-success" | "auth-error";

interface MessageVariation {
  [key: string]: Variation;
}

interface Props {
  variation: MessageType;
}

function AuthMessage({ variation }: Props) {
  const content: MessageVariation = {
    "auth-info": {
      icon: <Info />,
      title: "Validación de acceso.",
      description:
        "Las credenciales de usuario estan siendo procesadas, espera un momento.",
      color: "blue",
    },
    "auth-success": {
      icon: <Success />,
      title: "Validación exitosa.",
      description:
        "Las credenciales de usuario son correctas, espera un momento serás redirigido al dashboard.",
      color: "green",
    },
    "auth-error": {
      icon: <Error />,
      title: "Credenciales erróneas.",
      description:
        "Las credenciales ingresadas no estan registradas en nuestro sistema, intenta de nuevo.",
      color: "red",
    },
  };
  return (
    <>
      <div className="text-neutral-800/95 dark:text-gray-50 pl-4 flex flex-wrap items-center gap-x-4">
        {content[variation].icon}
        <div className="w-[70%]">
          <h6 className="font-extrabold text-lg mb-1">
            {content[variation].title}
          </h6>
          <p className="text-neutral-600/95 text-xs dark:text-gray-100/90">
            {content[variation].description}
          </p>
        </div>
      </div>
      <div
        className={`absolute bg-${content[variation].color}-600 w-2 h-full top-0 left-0 z-50`}
      />
    </>
  );
}

// Descriptive icons
function Info() {
  return (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <ShieldQuestion size={20} />
    </div>
  );
}

function Success() {
  return (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <ShieldCheck size={20} />
    </div>
  );
}

function Error() {
  return (
    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
      <ShieldX size={20} />
    </div>
  );
}

export { AuthMessage };
