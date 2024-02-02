/* eslint-disable react/prop-types */

import { Loader2 } from "lucide-react";

const PayButtons = ({
  paymentMethod,
  handleOrderByCashOnDelivery,
  isCompletingOrder,
  orderStatus,
}) => {

  return (
    <>
      {paymentMethod === "Cash On Delivery" &&
        (orderStatus === "Processing" || orderStatus === "Delivered" ? (
          <div className="flex justify-center items-center bg-theme-500 py-2">
            <p className="text-white sm:text-xl text-sm">Thank you for shopping with us</p>
          </div>
        ) : (
          <button
            onClick={handleOrderByCashOnDelivery}
            type="button"
            disabled={
              orderStatus === "Processing" || orderStatus === "Delivered"
            }
          >
            {isCompletingOrder ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Processing your Order...</span>
              </>
            ) : orderStatus === "Processing" ? (
              <span>Your order will be delivered!</span>
            ) : (
              <span>Complete your Order</span>
            )}
          </button>
        ))}
    </>
  );
};

export default PayButtons;
