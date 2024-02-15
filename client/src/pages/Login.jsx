import { useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import queryString from "query-string";
import { toastErrorOptions, toastOptions } from "../constants";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  /** check if the login route has a redirect */
  const { redirectTo } = queryString.parse(location.search);

  /** login user */
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const { status } = await axios.post("/auth/login", {
        email: userData.email,
        password: userData.password,
      });
      if (status === 200) {
        toast.success("Login Successful", toastOptions);
        navigate(redirectTo === undefined ? '/' : redirectTo);
      }
    } catch (error) {
      toast.error(error.response.data.error, toastErrorOptions);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="auth_container">
      <h1 className="auth-title">Login to continue</h1>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="form_btn">
          {isLoggingIn ? (
            <>
              <Loader2 />
              <span>Logging in...</span>
            </>
          ) : (
            <span>Log into your Account</span>
          )}
        </button>
        <p className="text-left pt-4 font-medium text-sm">
          Forgot password?{" "}
          <Link
            className="text-red-800 underline font-bold"
            to={"/forgot-password"}
          >
            Click Here!!
          </Link>
        </p>
      </form>
      <div className="links">
        <p>{"Don't have an Account?"}</p>
        <Link to={"/register"}>Click Here!</Link>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
