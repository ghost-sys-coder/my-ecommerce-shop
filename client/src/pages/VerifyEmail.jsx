import { useState, useEffect } from 'react'
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { EmailResetToken } from "../components";
import { toastErrorOptions, toastOptions } from '../constants';


const VerifyEmail = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [checkToken, setCheckToken] = useState('');
    const [tokenLoading, setTokenLoading] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [isResettingToken, setIsResettingToken] = useState(false);

    const token = pathname.split("/")[3];

    const handleShowModal = () => {
        setShowEmail(!showEmail)
    }

    /** handle email verification token reset */
    const handleEmailVerificationTokenReset = async (event) => {
        event.preventDefault();

        if (!email) {
            return toast.error('Email required!', toastErrorOptions);
        }
        setIsResettingToken(true);
        try {
            const { data, status } = await axios.post(`/auth/resend/email/token`, {
                email
            });
            console.log({ data });
            if (status === 200) {
                toast.success('Your verification token has been sent to your email!', toastOptions);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, toastErrorOptions);

            setTimeout(() => {
                if (error.response.status === 400) {
                    navigate("/login")
                } else if (error.response.status === 401) {
                    navigate("/register")
                }
            }, 1000);
        } finally {
            setIsResettingToken(false);
        }
    }

    useEffect(() => {
        const verifyEmailToken = async () => {
            setTokenLoading(true);
            try {
                const { data } = await axios.get(`/auth/verify/email/${token}`);
                console.log({ data });
                setCheckToken(data)
            } catch (error) {
                console.log(error);
                setCheckToken(error.response.data)
            } finally {
                setTokenLoading(false);
            }
        }
        verifyEmailToken();
    }, [token]);

    if (tokenLoading) {
        return (
            <main className="h-screen flex justify-center items-center">
            <Loader2 size={100} className="text-theme-700 font-extrabold" />
            <p className="text-theme-700 font-semibold">Loading...</p>
          </main>
        )
    }

    if (checkToken?.success) {
      return <Navigate to={"/login"} replace />
    }

    
    return (
        <div className="verify-page">
            <p>Email Verification failed!</p>
            <p>Click below to request a new verification token!</p>
            <button
                type='button'
                onClick={handleShowModal}
            >
                Request email verification token
            </button>

            {showEmail && (
                <EmailResetToken
                    email={email}
                    setEmail={setEmail}
                    isResettingToken={isResettingToken}
                    handleShowModal={handleShowModal}
                    handleEmailVerificationTokenReset={handleEmailVerificationTokenReset}
                />
            )}
            <Toaster />
        </div>
    )
}


export default VerifyEmail