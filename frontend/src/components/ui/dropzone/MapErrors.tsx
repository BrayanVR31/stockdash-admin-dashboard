import { FileError, ErrorCode } from "react-dropzone";
import Notification from "@/components/notification";

interface Props {
  errors: readonly FileError[] | null;
}

const matchCode: { [key: string]: { [key: string]: string } } = {
  "too-many-files": {
    message: "Has superado el número máximo de archivos permitidos.",
    title: "Límite de archivos superado",
  },
  "file-invalid-type": {
    message:
      "Tipo de archivo no compatible. Por favor, selecciona un archivo válido.",
    title: "Archivo inválido",
  },
};

const MapErrors = ({ errors }: Props) => {
  if (errors)
    return (
      <div>
        {errors.map((e) => (
          <Notification
            style={{
              maxWidth: "100%",
            }}
            key={e.code}
            type="error"
            isVisible
            onClose={() => null}
            title={matchCode[e.code]?.title || "Error inesperado"}
            duration={3_100}
          >
            {matchCode[e.code]?.message ||
              "Algo salió mal durante la carga del archivo. No se pudo determinar la causa."}
          </Notification>
        ))}
      </div>
    );
};

export default MapErrors;
