import toast from "react-hot-toast";
import { toastErrorOptions } from "../constants";


export const handleCheckoutFormValidation = async (values) => {
  if (!values.name) {
      return toast.error("Your name is required!", toastErrorOptions);
  } else if (!values.email) {
    return toast.error("Provide your email!", toastErrorOptions);
  } else if (!values.mobileNo) {
    return toast.error("Provide your mobile number!", toastErrorOptions);
  } else if (!values.city) {
    return toast.error("Your city is missing!", toastErrorOptions);
  } else if (!values.paymentMethod) {
    return toast.error("Choose a payment method", toastErrorOptions);
  }
};
