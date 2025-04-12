import { RefObject } from "react";
import { X } from "lucide-react";

interface Props {
  modalRef: RefObject<HTMLDialogElement | null>;
  title: string;
  description: string;
}

const ModalHeader = ({ modalRef, title, description }: Props) => {
  return (
    <>
      <button
        type="button"
        onClick={() => modalRef.current?.close()}
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      >
        <X className="w-4" />
      </button>
      <h4 className="font-bold text-xl mb-2">{title}</h4>
      <p>{description}</p>
    </>
  );
};

export default ModalHeader;
