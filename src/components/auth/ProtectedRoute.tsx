import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hook/useAuth";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to={"/auth"} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
