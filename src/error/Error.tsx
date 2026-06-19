import { useMemo } from "react";
import {
  AlertTriangle,
  RefreshCcw,
  ArrowLeft,
  CloudOff,
  Bug,
} from "lucide-react";

interface ErrorUIProps {
  error?: string | null;
  onRefetch?: () => void;
  title?: string;
}

export default function ErrorUI({
  error,
  onRefetch,
  title = "Something went wrong",
}: ErrorUIProps) {
  const randomTip = useMemo(() => {
    const tips = [
      "Check your internet connection.",
      "Refresh and try again.",
      "The server may be temporarily unavailable.",
      "Please try again in a moment.",
    ];

    return tips[Math.floor(Math.random() * tips.length)];
  }, []);

  const handleRetry = () => {
    if (onRefetch) {
      onRefetch();
      return;
    }

    window.location.reload();
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-6 sm:px-6">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)] transition-colors dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40">
        {/* Top Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400" />

        {/* Background Blur */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-red-500/10 blur-3xl dark:bg-red-500/5" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl dark:bg-orange-400/5" />
        </div>

        <div className="relative z-10 p-5 sm:p-7">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/10">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
          </div>

          {/* Header */}
          <div className="mt-5 text-center">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              {title}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {error ||
                "An unexpected error occurred while processing your request. Please try again or return to the previous page."}
            </p>
          </div>

          {/* Status Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <CloudOff className="h-3.5 w-3.5" />
              Connection Issue
            </div>

            <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <Bug className="h-3.5 w-3.5" />
              Server Error
            </div>
          </div>

          {/* Tip */}
          <p className="mt-5 text-center text-xs text-zinc-500 dark:text-zinc-500">
            <span className="font-medium">Tip:</span> {randomTip}
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={handleRetry}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.01] hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </button>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition-all hover:scale-[1.01] hover:bg-zinc-100 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
