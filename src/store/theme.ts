import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: getSystemTheme(),

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle("dark", theme === "dark");
      },

      toggleTheme: () => {
        const newTheme = get().theme === "dark" ? "light" : "dark";

        set({ theme: newTheme });
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      },
    }),
    {
      name: "theme-storage",
    },
  ),
);

export default useThemeStore;
