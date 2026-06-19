import useThemeStore from "@/store/theme";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";

function RequestLoading() {
  const [loaderSize, setLoaderSize] = useState(15);
  const { theme } = useThemeStore();

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 640) setLoaderSize(100);
      else if (width < 1024) setLoaderSize(105);
      else setLoaderSize(110);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-white/60 dark:bg-black/70 backdrop-blur-sm px-4">
      <RingLoader
        loading={true}
        size={loaderSize}
        color={isDark ? "#ffffff" : "#111827"}
      />

      <p className="text-neutral-800 dark:text-white/80 text-xs sm:text-sm md:text-base font-medium tracking-wide text-center">
        Loading
        <span className="inline-flex animate-pulse ml-1">...</span>
      </p>
    </div>
  );
}

export default RequestLoading;
