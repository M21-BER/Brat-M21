import { createContext, useContext, useMemo, type ReactNode } from "react";

import { useAuth } from "@/hooks/useAuth";

interface AuthContextType {
  userData: any | null;
  loading: boolean;
  error: unknown;
  logout: () => Promise<void>;
  refetchUserData: () => void;
  setAuth: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error, logout, refetchUserData, setAuth } = useAuth({
    queryKey: ["auth_key"],
    url: "auth_url",
  });

  const value = useMemo<AuthContextType>(
    () => ({
      userData: data?.userData ?? null,

      loading: isLoading,

      error,

      logout,

      refetchUserData,

      setAuth,
    }),
    [data, isLoading, error, logout, refetchUserData, setAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return ctx;
};
