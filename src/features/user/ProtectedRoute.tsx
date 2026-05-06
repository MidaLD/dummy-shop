import { Navigate } from "react-router";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return null;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
