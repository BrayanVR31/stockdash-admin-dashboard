import { ErrorInfo, TypeError } from "@/types/error";
import { useAuthenticationStore } from "@/store/authenticationStore";
import "./index.css";

type Props = ErrorInfo;

const CardError = ({ ilustration, message, statusCode, type }: Props) => {
  const setIsLogged = useAuthenticationStore((state) => state.setIsLogged);
  const matchError: {
    [key in TypeError]: {
      title: string;
      action: {
        message: string;
        cb: () => void;
      };
    };
  } = {
    "login-again": {
      title: "Sesión expirada",
      action: {
        message: "Inicia sesión de nuevo",
        cb: () => setIsLogged(false),
      },
    },
    none: {
      title: "",
      action: {
        message: "Ir al dashboard",
        cb: () => null,
      },
    },
  };
  return (
    <div className="card-error">
      <div className="card-error-img">
        <img src={ilustration} />
      </div>
      <p className="card-error-status">{statusCode}</p>
      <h4 className="card-error-title">{matchError[type].title}</h4>
      <p className="card-error-description">{message}</p>
      <button onClick={matchError[type].action.cb} className="btn btn-primary">
        {matchError[type].action.message}
      </button>
    </div>
  );
};

export default CardError;
