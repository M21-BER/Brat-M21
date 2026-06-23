import { Outlet, createHashRouter } from "react-router-dom";
import AppWrapper from "@/layout/Wrapper";
import { RouteErrorFallback } from "@/error/ErrorFallback";
import allRoutes from ".";
import { AuthProvider } from "@/context/AuthContext";
import { LoginRoute } from "./LoginRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import NotFound from "./NotFound";

function WithAuthProvider() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
const CoreComponent = {
  element: <AppWrapper />,
  children: [
    ...allRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
const AuthComponent = {
  element: <WithAuthProvider />,
  children: [
    {
      path: "/login",
      element: <LoginRoute />,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [CoreComponent],
    },
  ],
  errorElement: <RouteErrorFallback />,
};
const BasicComponent = {
  path: "/",
  ...CoreComponent,
  errorElement: <RouteErrorFallback />,
};
const basicOrAuthed = false;
export const router = createHashRouter([
  basicOrAuthed ? AuthComponent : BasicComponent,
]);
