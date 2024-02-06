/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";

const CashOnDeliveryBtn = ({
  handleOrderByCashOnDelivery,
  orderStatus,
  isCompletingOrder,
  order,
}) => {
  return (
    <>
      {!order?.isPaid && (
        <button
          onClick={handleOrderByCashOnDelivery}
          type="button"
          disabled={orderStatus === "Processing" || orderStatus === "Delivered"}
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
      )}
    </>
  );
};

export default CashOnDeliveryBtn;
