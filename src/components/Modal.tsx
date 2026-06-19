import { AlertTriangle } from "lucide-react";

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export function AlarmModal({ open, message, onClose }: Props) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-all duration-300 ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 ${
          open ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
      >
        {/* ICON */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 dark:bg-yellow-500/10">
          <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
        </div>

        {/* TEXT */}
        <div className="mt-5 text-center">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Exam Warning
          </h2>

          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {message}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
