/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { useCartContext } from "../../context/ShoppingCartContext";
import { toastErrorOptions, toastOptions } from "../../constants";
import { useAuthContext } from "../../context/AuthContext";

const PayPalBtn = ({ totalAmount, handleFetchOrder, orderId, order }) => {
  const navigate = useNavigate();
  const { exchangeRate } = useCartContext();
  const [{ isPending }] = usePayPalScriptReducer();
  const { userProfile } = useAuthContext();

  // launch emailjs
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  }, [])

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        const response = await axios.put(`/paypal/${orderId}/pay`, {
          details,
        });
        toast.success("Payment successful", toastOptions);

        if (response.status === 200) {
          await handleFetchOrder();

        const { status } = await emailjs.send(serviceId, templateId, {
            name: userProfile?.name,
            userEmail: userProfile?.email
         });
          if (status === 200) {
           navigate("/checkout/success")
         }
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error, toastErrorOptions);
      }
    });
  };

  const onError = async (err) => {
    toast.error(err.message, toastErrorOptions);
    console.log(err.message)
  };

  const createOrder = async (data, actions) => {

    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: Math.ceil(totalAmount * exchangeRate) + 0.99 },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  return (
    <>
      {!order?.isPaid && (
        isPending ? (
          <div className="flex justify-center items-center gap-2 text-theme-700 ">
            <Loader2 />
            <p>Loading...</p>
          </div>
        ) : (
          <PayPalButtons
            className="z-10"
            onApprove={onApprove}
            createOrder={createOrder}
            onError={onError}
          />
        )
      )}
      <Toaster />
    </>
  );
};

export default PayPalBtn;
