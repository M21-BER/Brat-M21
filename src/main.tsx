import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./error/ErrorFallback";
import { Toaster } from "sonner";
import { queryClient, QueryClientProvider } from "@/lib/queryClient";
import "@/styles/index.css";
import ThemeSync from "@/components/ThemeInit";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <ThemeSync />
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster />
      </ErrorBoundary>
    </HelmetProvider>
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
