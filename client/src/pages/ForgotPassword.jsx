import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { toastOptions } from "../constants";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmail = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { status } = await axios.post("/auth/forgot-password", {
                email
            });
            toast.success("A reset code has been sent to your email!", toastOptions);
            setTimeout(() => {
                if (status === 200) {
                    navigate("/reset-password");
                }
            }, 3000);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, toastOptions)
        } finally {
            setIsSubmitting(false);
        }
    }

  return (
      <div className="auth_container">
          <h1 className="auth-title">Reset Password:</h1>
          <form onSubmit={handleEmail}>
              <div className="input-container">
                  <label htmlFor="email">Provide your Registered Email:</label>
                  <input type="email" name="email" id="email"
                      placeholder="Email..."
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                  />
              </div>
              <button type="submit" className="form_btn">
              {isSubmitting ? (
            <>
              <Loader2 />
              <span>Sending Email...</span>
            </>
          ) : (
            <span>Send Email</span>
          )}
              </button>
          </form>
          <Toaster />
    </div>
  )
}

export default ForgotPassword