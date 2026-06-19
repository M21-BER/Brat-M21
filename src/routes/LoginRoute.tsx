import { Navigate, useLocation } from "react-router-dom";

import Login from "@/pages/login";

import { useAuthContext } from "@/context/AuthContext";

import RequestLoading from "@/loading/RequestLoading";

export function LoginRoute() {
  const { userData, loading } = useAuthContext();

  const location = useLocation();

  const from = location.state?.from || "/";

  if (loading && !userData) {
    return <RequestLoading />;
  }

  if (userData) {
    return <Navigate to={from} replace />;
  }

  return <Login />;
}
