import { LoadingSpinner } from "@/Components/LoadingSpinner";
import { useAuth } from "@/Auth/AuthProvider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />;
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
