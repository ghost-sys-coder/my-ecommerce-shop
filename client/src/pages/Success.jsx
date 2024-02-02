import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { runFireworks } from "../utils/fireworks";
import { useAuthContext } from "../context/AuthContext";

const Success = () => {
    const { isUserLoading, isUserAuthenticated, userProfile } = useAuthContext();
    console.log({userProfile})

    const emailAddress = 'ecommercedock@gmail.com';
    const subject = 'Hello from shopLocker';
    const body = 'Place here your inquiry...';

    const handleOpenEmail = () => {
        const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }

    useEffect(() => {
        if (isUserAuthenticated) {
            runFireworks();
        }
    }, [isUserAuthenticated]);

    /** run if user information is still loading */

    if (isUserLoading) {
        return (
          <main className="min-h-screen flex justify-center items-center">
            <Loader2 size={100} className="text-theme-700 font-extrabold" />
            <p className="text-theme-700 font-semibold">Loading...</p>
          </main>
        );
    }
    
    /** check if user is authenticated */
    if (!isUserAuthenticated) {
        return <Navigate to={"/login"} />
    }



  return (
      <div className="success">
          <div className="success-container">
              <div className="flex justify-center items-center">
                  <BsBagCheckFill className="text-4xl text-theme-500" />
              </div>
              <h2 className="title">Thank you for order</h2>
              <p className="delivery">Your order will be delivered in the next 24 hours!</p>
              <div className="email-message">
                  <p>If you have any inquiries or questions, please email!</p>
                  <button onClick={handleOpenEmail} type="button">
                      Open up your email box
                  </button>
              </div>
              <Link to={"/"}>Continue Shopping</Link>
          </div>
    </div>
  )
}

export default Success