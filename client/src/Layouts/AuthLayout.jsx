import { useEffect } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import authImg from "/auth-background1.png";
import { Loader } from "../components";

const AuthLayout = () => {
  const { isUserAuthenticated, isUserLoading, fetchUserProfile } = useAuthContext();
  
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile])

  if (isUserLoading) {
    return (
      <Loader />
    );
  }

  return (
    <>
      {isUserAuthenticated ? (
        <Navigate to={"/"} replace />
      ) : (
        <main className="max-w-[1600px] mx-auto h-screen flex">
          <div className="flex-1">
            <Outlet />
          </div>
          <div className="flex-1 h-full hidden lg:block relative">
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
