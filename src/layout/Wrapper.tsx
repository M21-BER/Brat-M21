import Navbar from "@/components/ui/Navbar";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import RequestLoading from "@/loading/Loading";
import { Outlet } from "react-router-dom";

export default function WrapperLayout() {
  return (
    <LoadingProvider>
      <main className="text-neutral-900 dark:text-white">
        <Navbar />
        <Body />
      </main>
    </LoadingProvider>
  );
}

function Body() {
  const { isLoading } = useLoading();

  return (
    <div className="relative">
      <Outlet />
      {isLoading && <RequestLoading />}
    </div>
  );
}
