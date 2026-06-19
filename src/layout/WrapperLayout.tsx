import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import RequestLoading from "@/loading/RequestLoading";
import { Outlet } from "react-router-dom";

export default function WrapperLayout() {
  return (
    <LoadingProvider>
      <main className="bg-neutral-100 min-h-screen text-neutral-900 dark:bg-neutral-900 dark:text-white">
        {/* Navbar can come here... */}
        <div className="mx-auto w-full max-w-7xl">
          <MainContent />
        </div>
      </main>
    </LoadingProvider>
  );
}

function MainContent() {
  const { isLoading } = useLoading();

  return (
    <div className="relative flex flex-col">
      <Outlet />

      {isLoading && <RequestLoading />}
    </div>
  );
}
