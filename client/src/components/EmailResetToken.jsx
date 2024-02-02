/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";
import { FaTimes } from "react-icons/fa";

const EmailResetToken = ({email, setEmail, isResettingToken, handleShowModal, handleEmailVerificationTokenReset}) => {

    return (
        <div className="form-container">
            <form className="shadow-md rounded-md bg-white p-2 w-[500px]">
                <div className="flex justify-end items-end py-2">
                    <FaTimes
                        size={30} className="text-theme-700 cursor-pointer"
                        onClick={handleShowModal}
                    />
                </div>
            <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-theme-700" htmlFor="email">Email:</label>
                <input type="email" name="email" id="email"
                    placeholder="Enter your email..."
                    className="w-full py-2 px-2 w-full outline-none focus-within:bg-indigo-600 focus-within:text-white placeholder:text-gray-600"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                    <button
                        type="submit"
                        onClick={handleEmailVerificationTokenReset}
                    >
                    {isResettingToken ? (
                        <>
                            <Loader2 />
                            <span>Generating...</span>
                        </>
                    ): (
                        <span>Get Token</span>
                    )}
                </button>
            </div>
        </form>
        </div>
    )
}

export default EmailResetToken;