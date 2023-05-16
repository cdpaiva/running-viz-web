import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Role } from "../types/Roles";

interface AuthProps {
  allowedRoles: Role[];
}

const RequireAuth = ({ allowedRoles }: AuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!auth?.roles?.find((role) => allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
