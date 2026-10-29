import { Navigate } from "react-router-dom";
import { getToken } from "@/lib/adminApi";

const RequireAdminAuth = ({ children }: { children: React.ReactNode }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default RequireAdminAuth;
