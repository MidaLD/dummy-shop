import { Navigate, Outlet } from "react-router";
import { useCurrentUser } from "../authentication/useCurrentUser";

function ProtectedRoute() {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return null;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
