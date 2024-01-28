/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { pathname } = useLocation();
  const { isUserAuthenticated, isUserLoading, fetchUserProfile } = useAuthContext();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (isUserLoading) {
    return (
      <main className="h-screen flex justify-center items-center gap-3">
        <Loader2 size={100} className="text-theme-500 animate-spin" />
        <h1 className="text-theme-500 font-poppins text-2xl">
          Please wait, application loading...
        </h1>
      </main>
    );
  }
  return (
    <>
      {isUserAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to={`/login?redirectTo=${pathname}`} />
      )}
    </>
  );
};

export default ProtectedRoute;
