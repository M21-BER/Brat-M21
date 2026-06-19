import { useNavigate, useRouteError } from "react-router-dom";
import errorImg from "@/assets/images/error.png";
import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const navigate = useNavigate();
  const runtimeError = error as Error;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 p-4 text-center transition-colors duration-300">
      <img
        src={errorImg}
        alt="Error"
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mb-6 object-contain"
      />

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
        Oops! Something went wrong
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-6 max-w-md">
        {runtimeError.message || "An unexpected error occurred."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
        >
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
        >
          Go Home
        </button>

        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
        >
          Try Again
        </button>
      </div>

      <p className="mt-6 text-xs text-neutral-400 dark:text-neutral-500">
        If the issue persists, contact support.
      </p>
    </div>
  );
}

// For React Router route errors
export function RouteErrorFallback() {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 p-4 text-center transition-colors duration-300">
      <img
        src={errorImg}
        alt="Error"
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mb-6 object-contain"
      />

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
        Route Error!
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-6 max-w-md">
        {error?.message || "An unexpected error occurred."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
        >
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
        >
          Go Home
        </button>

        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
