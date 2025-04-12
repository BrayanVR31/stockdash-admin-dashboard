import { RefObject } from "react";

interface Props {
  onAttach: () => void;
  modalRef: RefObject<HTMLDialogElement | null>;
}

const ModalAction = ({ onAttach, modalRef }: Props) => {
  return (
    <div className="modal-action">
      <button
        type="button"
        onClick={() => modalRef.current?.close()}
        className="btn btn-outline flex-1"
      >
        Cancelar
      </button>
      <button
        type="button"
        onClick={onAttach}
        className="btn btn-primary flex-1"
      >
        Adjuntar
      </button>
    </div>
  );
};

export default ModalAction;
