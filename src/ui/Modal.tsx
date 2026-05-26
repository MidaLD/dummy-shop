import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../features/hooks/useOutsideClick";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
};

function Modal({ onClose, children, maxWidth = "max-w-3xl" }: ModalProps) {
  const ref = useOutsideClick<HTMLDivElement>(onClose);

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={ref}
          className={`relative my-4 w-full ${maxWidth} overflow-hidden rounded-2xl bg-white shadow-2xl`}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-slate-100 hover:text-slate-800"
          >
            <HiXMark className="h-4 w-4" />
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("root") ?? document.body,
  );
}

export default Modal;
