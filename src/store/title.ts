import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the store type
interface TitleState {
  title: string;
  setTitle: (newTitle: string) => void;
}

const useTitle = create<TitleState>()(
  persist(
    (set) => ({
      title: "Dashboard", // default value
      setTitle: (newTitle: string) =>
        set(() => ({
          title: newTitle,
        })),
    }),
    {
      name: "dashboard-title", // key in localStorage
    }
  )
);

export default useTitle;
