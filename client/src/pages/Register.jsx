import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toastOptions } from "../constants";


const Register = () => {
    const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [ userData, setUserData ] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
      setUserData((values) => ({
          ...values,
          [name]: value
    }));
    };
    
    /** register user */

    const handleRegister = async (e) => {
        e.preventDefault();

        setIsCreating(true);

        try {
            const { status } = await axios.post("/auth/register", {
                name: userData.name,
                email: userData.email,
                password: userData.password
            });
            toast.success("Registration Successful!", toastOptions);
            if (status === 200) {
                navigate('/login')
            }
        } catch (error) {
            toast.error(error.response.data.error, toastOptions)
        } finally {
            setIsCreating(false);
        }
    }

  return (
    <div className="auth_container">
      <h1 className="auth-title">Create an Account!</h1>
      <form onSubmit={handleRegister}>
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name..."
            value={userData?.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email..."
            value={userData?.email}
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
            value={userData?.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="form_btn">
          {isCreating ? (
            <>
              <Loader2 />
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </button>
          </form>
          <div className="links">
          <p>Already have an account?</p>
          <Link to={"/login"}>Click Here!</Link>
        </div>
      <Toaster />
    </div>
  );
};

export default Register;
