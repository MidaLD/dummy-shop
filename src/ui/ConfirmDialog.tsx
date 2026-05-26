import Modal from "./Modal";

type ConfirmDialogProps = {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

function ConfirmDialog({
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: ConfirmDialogProps) {
  return (
    <Modal onClose={onClose} maxWidth="max-w-sm">
      <div className="p-6 pt-10">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        {message && <p className="mt-1 text-sm text-slate-500">{message}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border cursor-pointer border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg cursor-pointer bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
