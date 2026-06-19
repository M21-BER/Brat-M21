import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the store type
interface BackState {
  showBack: boolean;
  setBack: (value: boolean) => void;
}

const useBack = create<BackState>()(
  persist(
    (set) => ({
      showBack: false, // default value
      setBack: (value: boolean) =>
        set(() => ({
          showBack: value,
        })),
    }),
    {
      name: "dashboard-back", // key in localStorage
    }
  )
);

export default useBack;
