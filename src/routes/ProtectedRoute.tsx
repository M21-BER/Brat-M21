import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthContext } from "@/context/AuthContext";

import RequestLoading from "@/loading/RequestLoading";

export function ProtectedRoute() {
  const { userData, loading } = useAuthContext();

  const location = useLocation();

  if (loading && !userData) {
    return <RequestLoading />;
  }

  if (!userData) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
