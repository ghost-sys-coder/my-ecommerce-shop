import { useEffect } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import authImg from "/auth-background1.png";
import { Loader2 } from "lucide-react";

const AuthLayout = () => {
  const { isUserAuthenticated, isUserLoading, fetchUserProfile } = useAuthContext();
  
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile])

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
        <Navigate to={"/"} replace />
      ) : (
        <main className="max-w-[1440px] mx-auto h-screen flex">
          <div className="flex-1">
            <Outlet />
          </div>
          <div className="w-1/2 h-full hidden lg:block relative">
            <img
              src={authImg}
              alt="image"
              className="h-full w-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 shadow-lg rounded-lg bg-theme-500 backdrop-filter backdrop-blur-sm bg-opacity-60 flex flex-col gap-2 justify-center items-center">
              <h1 className="text-2xl text-white font-bold">shopLocker</h1>
              <p className="text-xl font-semibold text-white">
                You order <br /> we deliver!
              </p>
              <p className="text-white font-semibold">
                Shop with us from the comfort of your home!
              </p>
              <Link
                className="text-white font-mono bg-red-900 px-6 py-2 rounded-md"
                to={"/"}
              >
                Return to Shop
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default AuthLayout;
