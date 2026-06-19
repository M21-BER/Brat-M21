import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./error/ErrorFallback";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import "@/styles/index.css";
import ThemeSync from "@/components/ThemeInit";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeSync />
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </ErrorBoundary>
  </StrictMode>,
);

requestAnimationFrame(() => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.classList.add("hide");

    loader.addEventListener("transitionend", () => {
      loader.remove();
    });
  }
});
