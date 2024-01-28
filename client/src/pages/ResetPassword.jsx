import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { toastOptions } from "../constants";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!token || !password || !confirmPassword) {
      return toast.error("All fields are required!")
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setIsResetting(true);
    try {
      const { data, status } = await axios.post("/auth/reset-password", {
        token,
        password,
      });
      console.log(data);
      toast.success("Password Reset successful!", toastOptions);
      if (status === 200) {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, toastOptions);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="auth_container">
      <h1 className="auth-title">Reset Password</h1>
      <form onSubmit={handlePasswordReset}>
        <div className="input-container">
          <label htmlFor="token">Enter reset token:</label>
          <input
            type="text"
            id="token"
            name="token"
            placeholder="Enter token..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Enter New Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter new password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form_btn">
          {isResetting ? (
            <>
              <Loader />
              <span>Resetting Password...</span>
            </>
          ) : (
            <span>Reset Password</span>
          )}
        </button>

        <p className="py-4 text-sm font-bold text-center text-theme-500 flex gap-1">
          {"If you didn't receive a reset token"}{" "}
          <Link className="text-red-600" to={"/forgot-password"}>
            Click Here...
          </Link>
        </p>
      </form>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
