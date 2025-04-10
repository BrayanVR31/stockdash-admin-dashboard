import { FC } from "react";
import { Trash2, X } from "lucide-react";

interface DeleteModalProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  onConfirm: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ modalRef, onConfirm }) => (
  <dialog ref={modalRef} className="modal">
    <div className="modal-box">
      <h4 className="font-bold text-xl text-center mb-4 flex justify-center items-center">
        <Trash2 className="text-red-500 mr-2" />
        <span>Eliminación de registro</span>
      </h4>
      <p className="text-center">
        Al elegir esta opción, se eliminará por completo toda la información
        relacionada con este elemento.
      </p>
      <div className="modal-action justify-center">
        <button
          onClick={onConfirm}
          className="btn btn-error bg-red-600 border-red-600 text-white hover:bg-red-600/80"
        >
          Eliminar
        </button>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <X className="w-4.5" />
          </button>
          <button className="btn btn-neutral">Cancelar</button>
        </form>
      </div>
    </div>
  </dialog>
);

export default DeleteModal;
